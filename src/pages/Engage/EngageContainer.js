import React, { Component } from 'react';
import { Table } from 'antd';
import moment from "moment";
import worker from './../../worker/worker.js';
import WebWorker from './../../worker/workerSetup';
import { Sorter } from './../../util/util';


let columns = [
  {
    title: 'Exception',
    dataIndex: 'exception',
	sorter: {
		compare: (a, b) => {
		  let value = Number(a.exception.slice(0, -1)),
			nextValue = Number(b.exception.slice(0, -1));
			
		  return Sorter.DEFAULT(value, nextValue);
		},
		multiple: 1
	}
  },
  {
    title: 'Status',
    dataIndex: 'status',
	key: 'status',
	filters: [
		{
			text: 'Open',
			value: 'Open'	
		},
		{
			text: 'Close',
			value: 'Close'	
		}
	],
	onFilter: (value, list) => list.status.indexOf(value) === 0
  },
  {
    title: 'Comp Date',
    dataIndex: 'compDate',
	sorter: {
		compare: (dateA, dateB) => {
			return Sorter.DATE(dateA.compDate, dateB.compDate);
		},
		multiple: 1
	}
  },
  {
    title: 'Guest Id',
    dataIndex: 'guestId',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Issuer',
    dataIndex: 'issuer',
  },
  {
    title: 'Source Comp Amount',
    dataIndex: 'sourceCompAmount',
  },
  {
    title: 'Exception Type',
    dataIndex: 'exceptionType',
  }
];
	
export class EngageContainer extends Component {

	constructor(props) {
		super(props)

		this.state = {
			exceptionsList: [],
			defaultListCount: 6,
			listCount: 0,
			loading: false,
			selectedRowKeys: []
		}
		
		this.worker = new WebWorker(worker);
		this.onScroll = this.onScroll.bind(this);
		this.onSelectedRowKeysChange = this.onSelectedRowKeysChange.bind(this);
		this.selectRow = this.selectRow.bind(this);
		this.clearSelectedRows = this.clearSelectedRows.bind(this);
	}

	getExceptionInformation() {
		const { defaultListCount, listCount } = this.state;
		
		let retrieveInfo = {
			action: 'GET',
			start: listCount,
			end: listCount + defaultListCount
		};
		
		this.setState({loading: true });
		this.worker.postMessage(retrieveInfo);
	}
	
	onScroll(event) {
		let maxScroll = event.target.scrollHeight - event.target.clientHeight,
			currentScroll = event.target.scrollTop;
			
		currentScroll === maxScroll && !this.state.loading && this.getExceptionInformation();
	}

	componentDidMount = () => {
		this.getExceptionInformation();
		document.querySelector('.ant-table-body').addEventListener("scroll", this.onScroll);
		
		this.worker.addEventListener('message', event => {
			this.setState({
				exceptionsList: [...this.state.exceptionsList, ...event.data],
				listCount: this.state.listCount + this.state.defaultListCount,
				loading: false
			});
		});
	}
	
	selectRow(record) {
		const selectedRowKeys = [...this.state.selectedRowKeys];
		selectedRowKeys.indexOf(record.key) >= 0 && (selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1)) || (selectedRowKeys.push(record.key));
		
		this.setState({selectedRowKeys});
	}
	
	onSelectedRowKeysChange(selectedRowKeys) {
		this.setState({selectedRowKeys});
	}
	
	clearSelectedRows() {
		this.setState({selectedRowKeys: []});
	}

	render() {
		let { exceptionsList, loading, selectedRowKeys } = this.state,
		rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectedRowKeysChange,
			type:'checkbox',
			columnWidth: 0, // Set the width to 0
			renderCell: () => "", // Render nothing inside
		};
		
		return (
			<Table 
				className="exception-table" 
				loading={loading} 
				columns={columns} 
				dataSource={exceptionsList} 
				pagination={false} 
				scroll={{y:270, scrollToFirstRowOnChange: false }}
				onChange = {this.onChange}
				title={() => <span>GUESTS</span>}
				footer={() => <span>Scroll to get more records</span>}
				rowSelection={rowSelection}
				onRow={(record) => ({
					onClick: () => {
						this.selectRow(record);
					}
				})}
			/>
		);
	}
}
