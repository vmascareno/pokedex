import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Input, Card, Pagination } from 'antd';
import logo from '../assets/images/logo-pokemon.png';
import Http from '../http';

function Dashboard() {
    const { Header, Content } = Layout;
    const { Search } = Input;
    const { Meta } = Card;

    const [data, setData] = useState({});
    const [filter, setFilter] = useState('');

    useEffect(() => {
        if (localStorage.getItem('data')) {
            setData(JSON.parse(localStorage.getItem('data')));
        } else {
            search();
        }
    }, []);

    useEffect(() => {
        search(filter);
    }, [filter]);

    const search = (name, page) => {
        const url = [undefined, null, ''].includes(name) ? '/pokemon' : `/pokemon/${name}`;
        Http.get(`${url}?offset=${page ? page * 10 : '0'}&limit=10`).then((response) => {
            localStorage.setItem('data', JSON.stringify(response.data));
            setData(response.data);
        });
    }

    return (
        <Layout style={{ height: '100vh' }}>
            <Header style={{ marginBottom: 10 }}>
                <Row align='middle'>
                    <Col span={16}>
                        <img src={logo} width='120' height='auto' alt='Logo' />
                    </Col>
                    <Col span={8}>
                        <Search style={{ display: 'inline' }} placeholder="Search pokemon" enterButton onSearch={(value) => {
                            setFilter(value);
                        }} />
                    </Col>
                </Row>
            </Header>
            <Content style={{ padding: '0 50px', marginBottom: '20px' }}>
                <Row>
                    {data.hasOwnProperty('results') ? data.results.map((pokemon, index) => (
                        <Col span={3} key={index}>
                            <Card
                                key={index}
                                hoverable
                                style={{ width: 150, height: 'auto' }}
                                cover={<img alt="Avatar" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.match(/\/\d{1,}/)[0]}.png`} />}
                            >
                                <Meta title={pokemon.name.toUpperCase()} />
                            </Card>
                        </Col>
                    )) : (
                        <Col span={3}>
                            <Card
                                hoverable
                                style={{ width: 150, height: 'auto' }}
                                cover={<img alt="Avatar" src={data?.sprites?.front_default} />}
                            >
                                <Meta title={data?.name?.toUpperCase()} description={`W:${data?.weight} H:${data.height}`} />
                            </Card>
                        </Col>
                    )}
                </Row>
                {data.hasOwnProperty('results') && (
                    <Row align='end'>
                        <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
                            <Pagination defaultCurrent={1} total={data.count} showSizeChanger={false} onChange={(page) => {
                                search(null, page);
                            }} />
                        </Col>
                    </Row>
                )}
            </Content>
        </Layout >
    );
}

export default Dashboard;
