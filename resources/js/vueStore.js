export const VueStore = {
    nested              : { count: 0 },
    arr                 : ['foo', 'bar'],
    mess                : '12334325345',
    groupsModalWindow   : null,
    campaignsMap        : new Map(),
    groupsMap           : new Map(),

    // period = 'YESTERDAY', 'LAST_WEEK', 'THIS_MONTH'
    setup               : async function(period = 'YESTERDAY') {

        const store = this

        const yandexDirectInfoPromise = new Promise((resolve, reject) => {
            fetch(`/yandex-direct-info?period=${period}`)
            .then(response => response.text())
            .then(text => {
                const lines = text.split('\n').slice(1, -2);
                const header = lines.shift().split('\t');
                // delete(lines[0]);
                console.debug(header);

                store.campaignsMap.clear()
                lines.forEach(line => {
                    const lineArray = line.split('\t');
            
                    const lineObject = {};
                    lineObject[`${header[0]}`] = lineArray[0].trim()
                    lineObject[`${header[1]}`] = lineArray[1].trim()
                    lineObject[`${header[2]}`] = parseInt(lineArray[2])
                    lineObject[`${header[3]}`] = parseInt(lineArray[3])
                    lineObject[`${header[4]}`] = parseFloat(lineArray[4]) / 1000000
                    lineObject[`parentId`] = '-1'
            
                    const id = lineArray[0].trim();
                    store.campaignsMap.set(`${id}`, lineObject);
                })
            
                console.debug(store.campaignsMap);
                resolve(true)
            })
            .catch(error => console.log("request failed", error));
        })

        const groupListPromise = new Promise((resolve, reject) => {
            fetch('/groups-list')
            .then(response => response.json())
            .then(({server_answer, groups_list}) => {
                console.debug(server_answer, groups_list);
                
                store.groupsMap.clear()
                for (const group of groups_list) {
                    store.groupsMap.set(`${group.groupId}`, { 
                        'groupId'               : `${group.groupId}`, 
                        'groupName'             : `${group.groupName}`, 
                        'parentGroupId'         : `${group.parentGroupId}`, 
                        'chosen'                : false, 
                        'campaignsExtednded'    : true, 
                        'groupsExtended'        : true, 
                    })
                }
                resolve(true)
            })
            .catch(error => console.log("request failed", error));
        })

        Promise.all([
            yandexDirectInfoPromise,
            groupListPromise,
        ]).then(results => {
            console.debug('make links')

            fetch('/campaign-group-links')
            .then(response => response.json())
            .then(({server_answer, links_list}) => {
                if (server_answer == 'error') return
                for (const link of links_list) {

                    const campaign = store.campaignsMap.get(`${link.campaignId}`)
                    campaign.parentId = link.groupId
                }
            })
            .catch(error => console.log("request failed", error))
        });
    },
}