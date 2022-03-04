import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory, fetchCoinTickers } from "../api";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 40px 16px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
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
interface ITickers {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}
interface ChartProps {
    coinId: string;
}
function Price({ coinId }: ChartProps) {
    const { isLoading, data: priceData } = useQuery<iHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), {
        refetchInterval: 5000
    })

    const { data: tickersData } = useQuery<ITickers>(["tickers", coinId!], () => fetchCoinTickers(coinId!), {
    });
    return <div>
        {isLoading ? "Loading chart..." :
            <Overview>
                <OverviewItem>
                    <span>now Price</span>
                    <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>last day</span>
                    <span>${priceData?.map(props => props.close.toFixed(3))}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>today high</span>
                    <span>${priceData?.map(props => props.high.toFixed(3))}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>today low</span>
                    <span>${priceData?.map(props => props.low.toFixed(3))}</span>
                </OverviewItem>
            </Overview>
        }
    </div>
}
export default Price;