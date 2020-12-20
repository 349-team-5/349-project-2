import React from 'react'
import {DataGrid, ColDef} from '@material-ui/data-grid'
import {Searchbar} from './Searchbar'
import {grabData} from '../GrabDataHelpers';

import styles from './Data.module.css'

const columns: ColDef[] = [
    { field: 'state', headerName: "State", width: 130 },
    { field: 'positive', headerName: "Positive", width: 130 },
    { field: 'negative', headerName: "Negative", width: 130 },
    { field: 'death', headerName: "Deaths", width: 130 },
    { field: 'pending', headerName: "Pending", width: 130 }
]

interface StateData {
    state: string,
    positive: number | null,
    negative: number | null,
    death: number | null,
    pending: number | null,
}
// Specifically for use with the data grid
interface StateRowData extends StateData {
    id: number,
}

type DataViewState = {
    rows: StateRowData[]
}


export class DataView extends React.Component<{}, DataViewState> {
    state: DataViewState = {
        rows: []
    };

    componentDidMount() {
        grabData<StateData, StateRowData>("https://api.covidtracking.com/v1/states/current.json",
            (val, index) => {
                return {...val, id: index}
            })
            .then((val) => this.setState({rows: val})); //populates state with information to be displayed in each row.
        
    }

    render() {
        return (
            <div className={styles.container}>
                <Searchbar />
                <header><h1>Current State Counts</h1></header>
                <DataGrid 
                    rows={this.state.rows} 
                    columns={columns} 
                    pageSize={10} 
                    autoHeight={true}
                    disableSelectionOnClick={true}/>
            </div>
        )
    }
}