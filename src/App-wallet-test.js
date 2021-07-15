import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import data from './data';
import { useState } from 'react';
import { useEffect } from 'react';



function App() {

    const { products } = data;
    const [cartItems, setCartItems] = useState([]);

    const [web3, setweb3] = useState(undefined)
    const [acconts, setAccounts] = useState(undefined)
    const [contract, setContract] = useState(undefined)

    useEffect(() => {
        const init = async () => {
            const web3 = await getWeb3();

            const accounts = await web3.eth.getAccounts();

            const networkId = await web3.eth.net.getId();

            const deployedNetwork = simpleStorageContract.networks[networkId];

            const instance = new web3.eth.contract(
                simpleStorageContract.abi,
                deployedNetwork && deployedNetwork.adress,
            )

            setAccounts(accounts)
            setWeb3(web3)
            setContract(contract)
        }

        init()
    }, [])



    const onAdd = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
    };


    const onRemove = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist.qty === 1) {
            setCartItems(cartItems.filter((x) => x.id !== product.id));
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
                )
            );
        }
    };

    const onClearAll = () => { setCartItems([]) }


    return (
        <div className="App">
            <Header countCartItems={cartItems.length}></Header>
            <div className="row">
                <Main products={products} onAdd={onAdd}></Main>
                <Basket
                    cartItems={cartItems}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onClearAll={onClearAll}
                ></Basket>
            </div>


        </div>
    );
}
