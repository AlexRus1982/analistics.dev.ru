export const VueStore = {
    nested              : { count: 0 },
    arr                 : ['foo', 'bar'],
    mess                : '12334325345',
    groupsModalWindow   : null,
    campaignsMap        : new Map(),
    groupsMap           : new Map(),

    loadYndexDirectInfo : function() {
        fetch('/yandex-direct-info')
        .then(response => response.text())
        .then(text => {
            const lines = text.split('\n').slice(1, -2);
            const header = lines.shift().split('\t');
            // delete(lines[0]);
            console.debug(header);
            const data = new Array();
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
                this.campaignsMap.set(`${id}`, lineObject);
            })
        
            console.debug(this.campaignsMap);
        })
    },

    loadGroupsList      : function() {
        fetch('/groups-list')
        .then(response => response.json())
        .then(({server_answer, groups_list}) => {
            console.debug(server_answer, groups_list);
            for (const group of groups_list) {
                this.groupsMap.set(`${group.groupId}`, { 
                    'groupId'               : `${group.groupId}`, 
                    'groupName'             : `${group.groupName}`, 
                    'parentGroupId'         : `${group.parentGroupId}`, 
                    'chosen'                : false, 
                    'campaignsExtednded'    : true, 
                    'groupsExtended'        : true, 
                })
            }
        })
    },

    setup               : function() {
        this.loadGroupsList()
        this.loadYndexDirectInfo()
    },
}