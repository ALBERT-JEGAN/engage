import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';

export const MenuContainer = function(props) {
	const { menuList, mode = 'vertical', onClick } = props;
	
	return (
		<Menu mode={mode} onClick={onClick}>
			{
				menuList.map((list) => {
					const { text, key, icon} = list;
					
					return (
						<Menu.Item key={key} icon={<icon/>}>
							{text}
						</Menu.Item>
					)
				})
			}
		</Menu>
	 );
};

MenuContainer.propTypes = {
	menuList: PropTypes.array,
	mode: PropTypes.string,
	onClick: PropTypes.func
};