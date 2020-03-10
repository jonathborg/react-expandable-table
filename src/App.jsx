import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';
import { DateTime } from 'luxon';

const App = () => {

    const columns = [
        {
            name: 'id',
            title: '#',
            render: (value) => <a href="#">{value}</a>,
        },
        {
            name: 'name',
            title: 'Name',
            render: (value) => <p style={{ color: 'red' }}>{value}</p>
        },
        {
            name: 'description',
            title: 'Description',
            render: (value) => value.slice(0, 15) + '...'
        },
        {
            name: 'date',
            title: 'Date',
            render: (value) => value ? DateTime.fromFormat(value.toString(), 'yyyyMMddHHmmss').toFormat('dd/MM/yyyy') : ''
        }
    ];

    const data = [
        {
            id: 1,
            name: 'Joe',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, amet.',
            _content: () => (
                <div style={{ padding: 25 }}>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, adipisci temporibus iste incidunt sunt minus dignissimos error, reiciendis voluptate molestiae sed. Quaerat, error earum pariatur magnam sequi culpa officia odit? lorem100</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui possimus omnis a vitae unde quidem magnam nihil ullam optio laboriosam inventore facere placeat, esse aliquam rem similique sit accusamus enim alias fugit sapiente, illum amet. Sed ab officia maxime enim, quod dolore facere corporis dolor adipisci. Illo consectetur libero sunt inventore neque illum magnam officia labore sed error temporibus facilis et veniam assumenda molestiae dicta expedita doloribus aperiam tenetur perspiciatis dolorem, at totam placeat. Accusantium dolor, reprehenderit temporibus minus quibusdam optio vero non consequuntur. Ad assumenda incidunt amet aliquid consequatur nostrum, in omnis eum aspernatur asperiores vero autem laboriosam nam?</p>
                </div>
            ),
            date: 20200101000000,
        },
        {
            id: 2,
            name: 'John',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, amet.',
            date: 20200107000000,
            _content: () => (
                <p style={{ color: 'green' }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            )
        },
        {
            id: 3,
            name: 'Daniel',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, amet.',
            date: 20200103000000,
        },
    ];

    return (
        <div>
            <h1>Expandable Rows Table!</h1>

            <Table
                columns={columns}
                celled
                data={data}
                config={{ theme: 'semantic-ui' }}
            />
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));
