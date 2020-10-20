export default () => {
	const exceptionList = [],
			percenatage = ['14%', '15%', '13%', '17%', '12%', '11%', '10%', '3%', '20%'],
			name = ['Albert', 'Michael', 'Alvin', 'Owen', 'Guna', 'Raj'],
			type = ['Comp Assistant not used', 'Qualified exceeds policy', 'Retroactive comp assist', 'Not qualified'];
	
	for (let i = 0; i < 1000; i++) {
	  exceptionList.push({
		key: i,
		exception: percenatage[Number(Math.floor(Math.random()*8))],
		status: i%2 ===0 && 'Open' || 'Close',
		compDate: `Jan ${Number(Math.floor(Math.random()*8))+1}, 2020`,
		guestId: 1234567+i,
		name: name[Number(Math.floor(Math.random()*5))],
		issuer: 'Thomas',
		sourceCompAmount: `1000`,
		exceptionType: type[Number(Math.floor(Math.random()*3))],
	  });
	}
	
	self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
		if (!e) return;

		e.data.action === "GET" && postMessage(exceptionList.slice(e.data.start, e.data.end));
	});
}