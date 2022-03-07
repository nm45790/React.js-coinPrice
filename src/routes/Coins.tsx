import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
padding:16px 16px;
max-width: 480px;
margin :0 auto;
`;

const Header = styled.header`
height:10vh;
display:flex;
justify-content: center;
align-items: center;
margin-bottom: 16px;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
background-color: ${props => props.theme.boxColor};
color:${props => props.theme.bgColor};
margin-bottom: 16px;
border-radius: 16px;
a{
    padding: 16px;
    transition: color 0.3s ease-in;
    display: flex;
    align-items: center;
}
&:hover{
    a{
        color:${props => props.theme.accentColor};
    }
}
`;
const Img = styled.img`
width:35px;
height: 35px;
margin-right: 16px;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}
const Title = styled.h1`
    color:${props => props.theme.accentColor};
    font-size: 48px;
`;

const Loader = styled.span`
text-align: center;
font-size: 48px;
display: block;
`;
function Coins() {
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins)
    return (
        <Container>
            <Helmet>
                <title>코인</title>
            </Helmet>
            <Header>
                <Title>코인</Title>
            </Header>
            {isLoading ? <Loader>"Loadnig. . ."</Loader> :
                <CoinsList>
                    {data?.slice(0, 100).map((coin) => (<Coin key={coin.id}>
                        <Link to={`/${coin.id}`}
                            state={{ name: coin.name, rank: coin.rank }}>
                            <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                            {coin.name} &rarr;</Link >
                    </Coin>))}
                </CoinsList>}
        </Container >
    )
}
export default Coins;