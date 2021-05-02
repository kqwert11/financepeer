import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'

import styled from 'styled-components'
import 'react-table-6/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`


class MyDatabase extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            allData: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        console.log("in database");

        await api.getData().then(allData => {
            var allColumns = [];
            for (var key in allData.data.data[0]) {
              if (allData.data.data[0].hasOwnProperty(key)) {
                  allColumns.push(
                    {
                        Header: key.toUpperCase(),
                        accessor: key,
                    }
                  ); 
              }
            }

            this.setState({
                allData: allData.data.data,
                columns: allColumns,
                isLoading: false,
            })
        })
    }

    render() {
        const { allData, columns, isLoading } = this.state


        let showTable = true
        if (!allData.length) {
            showTable = false
        }
        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={allData}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default MyDatabase



