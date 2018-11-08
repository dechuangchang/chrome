function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y+M+D+h+m+s;
}
$(function(){
    // setTimeout(function(){
        function charts(chartData,chartTit){
            option = {
                title: {
                    text: '历史价格查询',
                    subtext: '帮您节省每一分钱'
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid:{
                    x:80,
                    y:80,
                    x2:80,
                    y2:80,
                },

                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: chartTit
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: [
                    {
                        name:'价格',
                        type:'line',
                        data:chartData,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        }
                    }
                ]
            };
            return option
        }
        chrome.storage.sync.get(["status"],function(date){
            if(date.status&&date.status=='yes'){
                //JD
                if(location.href.indexOf('jd')){
                    $(".product-intro").prepend("<div id='changdechuang'></div>");
                    var myChart = echarts.init(document.getElementById("changdechuang"));
                    var url = location.href.split('/');
                    let id = url.filter((item,index)=>{
                        return item.indexOf('.html') != -1
                    })[0].split('.')[0];
                    // console.log(getJdData(id))
                    $.ajax({
                        url: `https://www.gwdang.com/product/price_trend/?callback=jQuery151034680565816110787_1541655223148&dp_ids=${id}-3&dp_id=${id}-3&days=180&is_only_one=0&etao=1&crc64=1&_=1541655223198`,
                        method: 'GET',
                        dataType:'JSON',
                        success:  (res)=>{
                        console.log(res)
                        },
                        error:  (err)=>{
                            var a =  err.responseText;
                            var data = JSON.parse(a.substring(a.indexOf('(')+1,a.length-1));
                            var chartData = [];
                            var chartTit = [];
                            data.store[0].data.forEach((item,index)=>{
                                chartData.push(item[1])
                                chartTit.push(timestampToTime(item[0]/1000))
                            })
                            myChart.setOption(charts(chartData,chartTit));
                        },  
                    })  
                }
            }
        })
    // },2000)
})