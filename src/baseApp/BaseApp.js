import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Card, Layout, Menu, Image, Dropdown, Button, message } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons';
import { EngageContainer } from './../pages/Engage/EngageContainer';
import { MenuContainer } from './../components/MenuContainer';
import { GuestSlectionList, HeaderMenu } from './../applicationConstants';
import logo from './../images/logo.png';
import './BaseApp.scss';
import './../components/antd.css'

export class BaseApp extends Component {
	constructor(props) {
		super(props);
		
		this.engage = React.createRef();
		this.saveGuestDetail = this.saveGuestDetail.bind(this);
	}
	
	saveGuestDetail(event) {
		let engage = this.engage.current;
		
		if(engage.state.selectedRowKeys.length) {		
			message.info(`${engage.state.selectedRowKeys.length} Guest details saved`);
			engage.clearSelectedRows()
		}
	}
	
	render() {
		const { Header, Content } = Layout;
		
		let dropDownMenu = <MenuContainer menuList={GuestSlectionList} onClick={this.saveGuestDetail}/>
		
		return(
			<Layout className="layout">
				<Header>
					<Image src={logo} width={120}/>
					<MenuContainer menuList={HeaderMenu} mode="horizontal"/>
				</Header>
				<Content>
				  <div className="site-layout-content">
					<Card
						title="Engage"
					>
						<div className="btn-container">
							<Button>Button</Button>
							<Dropdown overlay={dropDownMenu} placement="bottomLeft" className="dropdown-menu">
							  <Button>Actions</Button>
							</Dropdown>							
							<Button className="report-btn">Run Report</Button>
						</div>
						<EngageContainer ref={this.engage}/>
					</Card>
				  </div>
				</Content>
			</Layout>
		);
	}
}

