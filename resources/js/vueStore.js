export const VueStore = {
    loading             : false,
    groupsModalWindow   : null,
    campaignsMap        : new Map(),
    groupsMap           : new Map(),

    // period = 'YESTERDAY', 'LAST_WEEK', 'THIS_MONTH'
    setup               : async function(period = 'YESTERDAY') {

        const store = this
        store.loading = true

        const yandexDirectInfoPromise = new Promise((resolve, reject) => {
            fetch(`/yandex-direct-info?period=${period}`)
            .then(response => response.text())
            .then(text => {
                // console.debug(text)
                const lines = text.split('\n').slice(1, -2);
                const header = lines.shift().split('\t');
                // delete(lines[0]);
                console.debug(header);

                store.campaignsMap.clear()
                lines.forEach(line => {
                    const lineArray = line.split('\t');
            
                    const lineObject = {};
                    lineObject[`parentId`] = '-1'
                    lineObject[`${header[0]}`] = lineArray[0].trim()
                    lineObject[`${header[1]}`] = lineArray[1].trim()
                    lineObject[`${header[2]}`] = parseInt(lineArray[2])
                    lineObject[`${header[3]}`] = parseInt(lineArray[3])
                    lineObject[`${header[4]}`] = parseFloat(lineArray[4]) / 1000000
                    lineObject[`${header[5]}`] = lineArray[5]
            
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

                        'Cost'                  : 0,
                        'Impressions'           : 0,
                        'Clicks'                : 0,

                        'chosen'                : false, 
                        'campaignsExtednded'    : true, 
                        'groupsExtended'        : true,
                        'tableGroupsExtended'   : true, 
                    })
                }
                resolve(true)
            })
            .catch(error => console.log("request failed", error));
        })

        const makeLinks = (links_list) => {
            for (const link of links_list) {

                const campaign = store.campaignsMap.get(`${link.campaignId}`)
                if (campaign) {
                    campaign.parentId = link.groupId
                } else {
                    console.debug(link)
                }
            }
        }

        const calcValuesOfCampaignsInGroups = () => {
            for (const [key, campaign] of store.campaignsMap) {
                const group = store.groupsMap.get(`${campaign.parentId}`)
                if (group) {
                    group.Cost          += campaign.Cost
                    group.Impressions   += campaign.Impressions
                    group.Clicks        += campaign.Clicks
                }
            }
        }

        const calcValuesOfSubGroups = () => {
            for (const [key, group] of store.groupsMap) {
                const parentGroup = store.groupsMap.get(`${group.parentGroupId}`)
                if (parentGroup && group.parentGroupId != -1) {
                    parentGroup.Cost          += group.Cost
                    parentGroup.Impressions   += group.Impressions
                    parentGroup.Clicks        += group.Clicks
                }
            }
        }

        Promise.all([
            yandexDirectInfoPromise,
            groupListPromise,
        ]).then(results => {
            console.debug('make links')

            fetch('/campaign-group-links')
            .then(response => response.json())
            .then(({server_answer, links_list}) => {
                if (server_answer == 'error') return
                makeLinks(links_list)
                calcValuesOfCampaignsInGroups()
                calcValuesOfSubGroups()
                store.loading = false
            })
            .catch(error => console.log("request failed", error))
        });
    },
}