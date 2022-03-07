import { useQuery } from "react-query";
import { fetchCoinsHistory } from "../api";
import ApexChart from "react-apexcharts";
import moment from "moment";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface iHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}
interface ChartProps {
    coinId: string;
}
interface ITime {
    time: string;
}
function Chart({ coinId }: ChartProps) {
    const darkAtom = useRecoilValue(isDarkAtom);
    const { isLoading, data } = useQuery<iHistorical[]>(["ohlcv", coinId], () => fetchCoinsHistory(coinId), {
        refetchInterval: 10000
    })

    return <div>
        {isLoading ? "Loading chart..." :
            // <ApexChart
            //     type="line"
            //     series={[
            //         {
            //             name: "Price",
            //             data: data?.map(props => props.close.toFixed(2))
            //         }
            //     ]}
            //     options={{
            //         theme: { mode: "dark", },
            //         title: {
            //             text: `${coinId} Price`,
            //             align: 'left'
            //         },
            //         chart: {
            //             height: 500,
            //             toolbar: {
            //                 show: false
            //             },
            //             background: "rgba(0, 0, 0, 0.5)",
            //         },
            //         stroke: {
            //             curve: "smooth",
            //             width: 3,
            //         },
            //         fill: {
            //             colors: ["red"],
            //             type: 'gradient',
            //             gradient: {
            //                 gradientToColors: ["blue"],
            //                 shadeIntensity: 0.5,
            //                 opacityFrom: 0.5,
            //                 opacityTo: 0.9,
            //                 stops: [0, 70, 100]
            //             },

            //         },
            //         grid: { show: false },
            //         yaxis: {
            //             axisBorder: { show: true },
            //             axisTicks: { show: true },
            //         },
            //         xaxis: {
            //             axisBorder: { show: true },
            //             axisTicks: { show: true },
            //             // type: 'datetime',
            //             categories: data?.map((props) => moment(props.time_close).format('MM-DD')),
            //             // categories: data?.map((props) => props.time_close),
            //         }
            //     }} />
            <ApexChart
                type="candlestick"
                series={[
                    {
                        data:
                            data?.map((props) => {
                                return [
                                    Date.parse(props.time_open),
                                    props.open.toFixed(3),
                                    props.high.toFixed(3),
                                    props.low.toFixed(3),
                                    props.close.toFixed(3),
                                ];
                            }),
                    },
                ]}
                options={{
                    theme: { mode: darkAtom ? "dark" : "light", },
                    title: {
                        text: `${coinId} Price Chart`,
                        align: 'left'
                    },
                    chart: {
                        height: 500,
                        toolbar: {
                            show: false
                        },
                        background: "rgba(0, 0, 0, 0.5)",
                    },
                    grid: { show: false },
                    yaxis: { show: false },
                    xaxis: {
                        axisBorder: { show: true },
                        axisTicks: { show: true },
                        type: "datetime",
                        categories: data?.map((props) => moment(props.time_close).format('MM-DD')),
                    }
                }} />
        }
    </div>
}
export default Chart;