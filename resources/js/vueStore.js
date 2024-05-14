export const VueStore = {
    loading             : false,

    groupsModalWindow   : null,

    draggedElement      : null,
    overedElement       : null,
    dragElementHalf     : null,

    allCostValue        : 0.0,
    allImpressionsValue : 0,
    allClicksValue      : 0,

    campaignsMap        : new Map(),
    groupsMap           : new Map(),
    costsMap            : new Map(),
    coastsAll           : new Map(),

    adImagesMap         : new Map(),
    adCampaignsMap      : new Map(),
    campaignsImages     : new Map(),

    // period = 'YESTERDAY', 'LAST_WEEK', 'THIS_MONTH'
    setup               : async function(period = 'YESTERDAY') {

        const store                 = this
        store.period                = period
        store.loading               = true
        store.allCostValue          = 0.0
        store.allImpressionsValue   = 0
        store.allClicksValue        = 0

        const yandexDirectImagesPromise = () => new Promise((resolve, reject) => {
            fetch(`/yandex-direct-images`)
            .then(response => response.text())
            .then(text => {
                // console.debug(text)
                
                const adImagesArray = JSON.parse(text).result.AdImages
                // console.table(adImagesArray)
                // console.debug(adImagesArray)
                adImagesArray.forEach(adImage => {
                    this.adImagesMap.set(`${adImage.AdImageHash}`, adImage)
                });
                console.debug(this.adImagesMap)

                resolve(true)
            })
            .catch(error => console.log("request failed", error));
        })

        const yandexDirectCampaignsPromise = () => new Promise((resolve, reject) => {
            fetch(`/yandex-direct-campaigns`)
            .then(response => response.text())
            .then(text => {
                // console.debug(text)
                // console.table(JSON.parse(text).result.Campaigns)
                // console.debug(JSON.parse(text).result.Campaigns.filter(campaign=>campaign.StatusClarification == 'Идут показы'))
                const campaignsArray = JSON.parse(text)?.result?.Campaigns?.filter(campaign=>campaign.StatusClarification != 'Кампания перенесена в архив')

                const adCampaignsMap = new Map()
                campaignsArray.forEach(campaignItem => {
                    adCampaignsMap.set(`${campaignItem.Id}`, campaignItem)
                });

                this.adCampaignsMap = adCampaignsMap
                console.debug(this.adCampaignsMap)
                // console.debug(JSON.parse(text).result.Campaigns)
                resolve(true)
            })
            .catch(error => console.log("request failed", error));
        })

        const yandexDirectGroupsPromise = () => new Promise((resolve, reject) => {
            fetch(`/yandex-direct-groups`)
            .then(response => response.text())
            .then(text => {
                // console.debug(text)
                // console.table(JSON.parse(text).result.Campaigns)
                console.debug(JSON.parse(text))
                resolve(true)
            })
            .catch(error => console.log("request failed", error));
        })

        const yandexDirectCampaignsGroupsPromise = () => new Promise((resolve, reject) => {
            fetch(`/yandex-direct-campaigns-groups`)
            .then(response => response.text())
            .then(text => {
                // console.debug(text)
                console.table(JSON.parse(text).result.AdGroups)
                // console.debug(JSON.parse(text))
                resolve(true)
            })
            .catch(error => console.log("request failed", error));
        })

        const yandexDirectCampaignsAdsPromise = () => new Promise((resolve, reject) => {
            fetch(`/yandex-direct-campaigns-ads`)
            .then(response => response.text())
            .then(text => {
                // console.debug(text)
                console.table(JSON.parse(text).result.Ads.filter(item=>item.State=="ON"))
                // console.debug(JSON.parse(text))
                resolve(true)
            })
            .catch(error => console.log("request failed", error));
        })

        const yandexDirectInfoPromise = () => new Promise((resolve, reject) => {
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

        const yandexDirectCostPromise = () => new Promise((resolve, reject) => {
            fetch(`/yandex-direct-cost`)
            .then(response => response.text())
            .then(text => {
                const lines = text.split('\n').slice(1, -2);
                const header = lines.shift().split('\t');
                console.debug(header);

                const costs = new Map()
                lines.forEach(line => {
                    const lineArray = line.split('\t');
            
                    const costDate = lineArray[0].trim();
                    const costValue = parseFloat(lineArray[1].trim()) / 1000000
                    const costOldValue = costs.get(`${costDate}`)
                    if (costOldValue) {
                        costs.set(`${costDate}`, costOldValue + costValue)
                    }
                    else {
                        costs.set(`${costDate}`, costValue)
                    }
                })

                const costsMonth = []
                for(const [key, value] of costs) {
                    costsMonth.push(key.split('-')[1])
                }
                const costsMonthUniq = new Set(costsMonth)
                console.debug(costsMonthUniq)

                const costsByMonth = new Map()

                for(const month of costsMonthUniq) {
                    const monthCoasts = Array
                    .from(costs)
                    .filter(value => value[0].split('-')[1] == month)

                    const monthCoastsObj = {}
                    for(const value of monthCoasts) {
                        const keyData = new Date(`${value[0]}`).toLocaleString('ru', {
                            month: 'short',
                            day: 'numeric'
                          });
                        monthCoastsObj[`${keyData}`] = parseInt(value[1])//String(parseInt(value[1])).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽'
                    }
                    costsByMonth.set(`${month}`, monthCoastsObj)
                }

                const costsAll = new Map()
                for(const [key, value] of costs) {
                    const keyData = new Date(`${key}`).toLocaleString('ru', {
                        month: 'short',
                        day: 'numeric'
                    });
                    costsAll.set(`${keyData}`, parseInt(value))

                }
                const lastKey = Array.from(costsAll.keys()).pop()
                costsAll.delete(`${lastKey}`)

                store.coastsAll = new Map([...costsAll])
                console.debug(store.coastsAll)


                const lastMonthKey = Array.from(costsByMonth.keys()).pop()
                const lastMonthDayKey = Object.keys(costsByMonth.get(`${lastMonthKey}`)).pop()
                delete costsByMonth.get(`${lastMonthKey}`)[`${lastMonthDayKey}`]

                console.debug(costsByMonth, lastMonthKey, Object.keys(costsByMonth.get(`${lastMonthKey}`)).length)

                if (Object.keys(costsByMonth.get(`${lastMonthKey}`)).length == 0) {
                    console.debug('empty')
                    // costsByMonth.delete(`${lastMonthKey}`)
                }

                store.costsMap = new Map([...costsByMonth])

                console.debug(store.costsMap, lastMonthKey, lastMonthDayKey)
                resolve(true)
            })
            .catch(error => console.log("request failed", error));
        })

        const groupListPromise = () => new Promise((resolve, reject) => {
            fetch('/groups-list')
            .then(response => response.json())
            .then(({server_answer, groups_list}) => {
                console.debug(server_answer, groups_list);
                
                store.groupsMap.clear()
                for (const group of groups_list) {
                    store.groupsMap.set(`${group.groupId}`, { 
                        'groupId'               : `${group.groupId}`,
                        'groupName'             : `${group.groupName}`,
                        'groupLevel'            : 0,
                        'groupOrder'            : `${group.groupOrder}`,
                        'parentGroupId'         : `${group.parentGroupId}`, 

                        'Cost'                  : 0,
                        'Impressions'           : 0,
                        'Clicks'                : 0,

                        'CostPerc'              : 0,
                        'ImpressionsPerc'       : 0,
                        'ClicksPerc'            : 0,

                        'CostStr'               : '',
                        'ImpressionsStr'        : '',
                        'ClicksStr'             : '',

                        'chosen'                : false, 
                        'campaignsExtednded'    : true, 
                        'groupsExtended'        : true,
                        'tableGroupsExtended'   : false, 
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

        const calcAllValues = () => {
            for (const [key, campaign] of store.campaignsMap) {
                store.allCostValue += campaign.parentId != '-1' ? campaign.Cost : 0;
                store.allClicksValue += campaign.parentId != '-1' ? campaign.Clicks : 0;
                store.allImpressionsValue += campaign.parentId != '-1' ? campaign.Impressions : 0;
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

        const formatValuesOfCampaigns = () => {
            for (const [key, campaign] of store.campaignsMap) {
                campaign.CPC                = campaign.Clicks != 0 ? campaign.Cost / campaign.Clicks : 0;
                campaign.CTR                = campaign.Impressions != 0 ? 100 * campaign.Clicks / campaign.Impressions : 0;

                campaign.CostPerc           = Number(100 * campaign.Cost / store.allCostValue);
                campaign.ClicksPerc         = Number(100 * campaign.Clicks / store.allClicksValue);
                campaign.ImpressionsPerc    = Number(100 * campaign.Impressions / store.allImpressionsValue);

                campaign.CostStr            = String(campaign.Cost.toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽'
                campaign.ImpressionsStr     = String(campaign.Impressions).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ")
                campaign.ClicksStr          = String(campaign.Clicks).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ")
            }
        }

        const formatValuesOfGroups = () => {
            for (const [key, group] of store.groupsMap) {
                group.CPC              = group.Cost / group.Clicks;
                group.CTR              = 100 * group.Clicks / group.Impressions;

                group.CostPerc         = Number(100 * group.Cost / store.allCostValue);
                group.ClicksPerc       = Number(100 * group.Clicks / store.allClicksValue);
                group.ImpressionsPerc  = Number(100 * group.Impressions / store.allImpressionsValue);

                group.CostStr          = String(group.Cost.toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ") + ' ₽'
                group.ImpressionsStr   = String(group.Impressions).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ")
                group.ClicksStr        = String(group.Clicks).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ")
            }
        }

        const makeGroupsLevel = (level, parentId) => {
            const groups = Array.from(store.groupsMap).filter(item => item[1].parentGroupId == parentId)
            for (const [key, group] of groups) {
                group.groupLevel = level
                makeGroupsLevel(level + 1, group.groupId)
            }
        }
        
        // const makeGroupsOrder = (parentId) => {
        //     const groups = Array.from(store.groupsMap).filter(item => item[1].parentGroupId == parentId)
        //     let order = 0
        //     for (const [key, group] of groups) {
        //         group.groupOrder = order
        //         order++
        //     }
        //     for (const [key, group] of groups) {
        //         makeGroupsOrder(group.groupId)
        //     }
        // }

        Promise.all([
            yandexDirectImagesPromise(),
            yandexDirectCampaignsPromise(),
            // yandexDirectGroupsPromise(),
            // yandexDirectCampaignsGroupsPromise(),
            // yandexDirectCampaignsAdsPromise(),
            yandexDirectInfoPromise(),
            yandexDirectCostPromise(),
            groupListPromise(),
        ]).then(results => {
            console.debug('make links')

            fetch('/campaign-group-links')
            .then(response => response.json())
            .then(({server_answer, links_list}) => {
                if (server_answer == 'error') return
                makeGroupsLevel(0, -1)
                // makeGroupsOrder(-1)
                makeLinks(links_list)
                calcAllValues()
                calcValuesOfCampaignsInGroups()
                calcValuesOfSubGroups()
                formatValuesOfGroups()
                formatValuesOfCampaigns()
                store.loading = false
                console.debug(store.groupsMap)
            })
            .catch(error => console.log("request failed", error))
        });
    },

    loadAdImages        : function(page=1) {
        const store     = this

        const yandexDirectCampaignsAdsPromise = () => new Promise((resolve, reject) => {
            fetch(`/yandex-direct-campaigns-ads?page=${page}`)
            .then(response => response.text())
            .then(text => {
                const adsArray = JSON.parse(text).result.Ads.filter(item=>(item.State=="ON"))
                // console.table(adsArray)
                
                const campaignsImages = new Map()
                adsArray.forEach(adsItem => {
                    if (!campaignsImages.get(`${adsItem.CampaignId}`)){
                        campaignsImages.set(`${adsItem.CampaignId}`, [])
                    }

                    if(this.adImagesMap.get(`${adsItem.TextAd?.AdImageHash}`))
                        campaignsImages.get(`${adsItem.CampaignId}`).push(this.adImagesMap.get(`${adsItem.TextAd.AdImageHash}`))
                });

                this.campaignsImages = campaignsImages
                console.table(campaignsImages)
                store.loading = false
                resolve(true)
            })
            .catch(error => console.log("request failed", error));
        })
        
        if (!this.adImagesMap.size){
            store.loading = true
            yandexDirectCampaignsAdsPromise()
        }
    },
}