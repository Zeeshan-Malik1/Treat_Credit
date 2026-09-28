// Transcribed from the supplied menu1–menu5.jpeg files. Prices retain source formatting.
const served='Served with soft serve ice cream and whipped cream.';
const flavours=['Milk Chocolate & Strawberry','White Chocolate & Strawberry','Kinder Bueno','Magic Stars','Maltesers','Rolo','Oreo','Biscoff','Pistachio','Ferrero Rocher','Kanafa','Kanafa & Strawberry'];
function trays(kind){
 const base=kind==='cookie'?'Warm milk and white chocolate cookie':kind==='brownie'?'Two warm, gooey brownies':'A warm Belgian waffle or crepe';
 const toppings=[
 'drizzled with milk chocolate sauce, topped with fresh strawberries.',
 'drizzled with white chocolate sauce, topped with fresh strawberries.',
 'drizzled with white chocolate and hazelnut sauce, topped with kinder bueno pieces.',
 'drizzled with milk chocolate sauce, topped with magic stars.',
 'drizzled with milk chocolate sauce, topped with crushed maltesers.',
 'drizzled with milk chocolate sauce, topped with rolos.',
 'drizzled with milk chocolate sauce, topped with oreos.',
 'drizzled with biscoff sauce, topped with biscoff crumbs.',
 'drizzled with pistachio sauce.',
 'drizzled with milk chocolate sauce, topped with ferrero rochers.',
 'drizzled with pistachio sauce, topped with pistachio kanafa.',
 'drizzled with pistachio sauce, topped with pistachio kanafa and strawberries.'
 ];
 return flavours.map((name,i)=>[name,i===11?'6.50':i===10?'6.00':i===9?(kind==='brownie'?'': '6.00'):'5.50',`${base}, ${toppings[i]} ${served}`]);
}
const MENU=[
 {label:'Cookies & sundaes',sections:[
  {title:'Warm Cookie Trays',items:trays('cookie')},
  {title:'Sundaes',items:[
   ['Kinder Bueno','5.00','Soft serve ice cream, layered with white chocolate and hazelnut sauce and kinder bueno pieces.'],
   ['Magic Stars','5.00','Soft serve ice cream, layered with milk chocolate sauce and magic stars.'],
   ['Maltesers','5.00','Soft serve ice cream, layered with milk chocolate sauce and crushed maltesers.'],
   ['Rolo','5.00','Soft serve ice cream, layered with milk chocolate sauce and rolos. Topped with whipped cream.'],
   ['Oreo','5.00','Soft serve ice cream, layered with milk chocolate sauce and crushed oreos.'],
   ['Biscoff','5.00','Soft serve ice cream, layered with biscoff sauce and biscoff crumbs.'],
   ['Ferrero Rocher','5.50','Soft serve ice cream, layered with milk chocolate sauce and crushed ferrero rochers.'],
   ['Kanafa','5.50','Soft serve ice cream, layered with pistachio sauce and kanafa.']]},
  {title:'Strawberry Pots',items:[
   ['Milk Chocolate','5.50','A cup of fresh strawberries smothered in milk chocolate.'],
   ['White Chocolate','5.50','A cup of fresh strawberries smothered in white chocolate.'],
   ['Kanafa','6.50','A cup of fresh strawberries smothered in milk chocolate with layers of pistachio kanafa.']]}
 ]},
 {label:'Bites & cakes',sections:[
  {title:'Brownie Bites',items:[
   ['Milk Chocolate','£6','Bitesize brownies smothered with milk chocolate.'],
   ['Milk Chocolate & Strawberry','£6.50','Bitesize brownies, layered with strawberries and smothered with milk chocolate.'],
   ['Kanafa & Milk Chocolate','£6.50','Bitesize brownies, layered with pistachio kanafa and smothered with milk chocolate.'],
   ['Kanafa, Milk Chocolate & Strawberry','£7','Bitesize brownies, layered with pistachio kanafa and strawberries, smothered with milk chocolate.'],
   ['White Chocolate','£6','Bitesize brownies smothered with white chocolate.'],
   ['White Chocolate & Strawberry','£6.50','Bitesize brownies, layered with strawberries and smothered with white chocolate.'],
   ['Kanafa & White Chocolate','£6.50','Bitesize brownies, layered with pistachio kanafa and smothered with white chocolate.'],
   ['Kanafa, White Chocolate & Strawberry','£7','Bitesize brownies, layered with pistachio kanafa and strawberries, smothered with white chocolate.']]},
  {title:'Canned Matilda Cakes',note:'Upgrade to crunch cake for £1',items:[
   ['Classic Matilda Cake','£5.50','Warm chocolate fudge cake, layered with chocolate ganache, sealed in a can.'],
   ['Kinder Matilda Cake','£6','Warm chocolate fudge cake, layered with chocolate ganache and kinder sauce, sealed in a can.'],
   ['Kanafa Matilda Cake','£6.50','Warm chocolate fudge cake, layered with chocolate ganache and pistachio kanafa sealed in a can.']]},
  {title:'Glitter Mocktails',note:'£5.50 · Upgrade to a Red Bull Mocktail for £1',items:['Blue Raspberry','Strawberry','Cherry','Mojito','Mango','Passionfruit','Peach'].map(name=>[name,'',''])}
 ]},
 {label:'Matcha & coffee',sections:[
  {title:'Matcha (Iced/Hot)',note:'Iced matcha & iced lattes are canned. Upgrade to oat milk for 50p',items:[
   ['Classic','4.50','Ceremonial grade matcha, with milk.'],
   ['White Chocolate','5.00','Ceremonial grade matcha, with white chocolate sauce.'],
   ['Vanilla','5.00','Ceremonial grade matcha, with vanilla syrup.'],
   ['Strawberry','5.00','Ceremonial grade matcha, with strawberry sauce.'],
   ['Cherry','5.00','Ceremonial grade matcha, with cherry sauce.'],
   ['Mango','5.00','Ceremonial grade matcha, with mango sauce.'],
   ['Pistachio','5.00','Ceremonial grade matcha, with pistachio sauce.'],
   ['Kinder Bueno','5.00','Ceremonial grade matcha, with white chocolate and hazelnut sauce.']]},
  {title:'Latte (Iced/Hot)',note:'Iced matcha & iced lattes are canned. Upgrade to oat milk for 50p',items:[
   ['Classic','4.00','Smooth espresso with milk.'],
   ['White Chocolate','4.50','Smooth espresso with milk, and white chocolate sauce.'],
   ['Vanilla','4.50','Smooth espresso with milk, and vanilla syrup.'],
   ['Caramel','4.50','Smooth espresso with milk, and caramel syrup.'],
   ['Kinder Bueno','4.50','Smooth espresso with milk, and white chocolate and hazelnut sauce.'],
   ['Pistachio','4.50','Smooth espresso with milk, and pistachio sauce.']]},
  {title:'Hot Chocolate',items:[
   ['Classic','4.00','Velvety hot chocolate, topped with whipped cream.'],
   ['Caramel','4.50','Velvety hot chocolate, with caramel syrup, topped with whipped cream.'],
   ['Biscoff','4.50','Velvety hot chocolate, with biscoff sauce, topped with whipped cream.'],
   ['Kinder','4.50','Velvety hot chocolate, with white chocolate and hazelnut sauce, topped with whipped cream.'],
   ['Pistachio','4.50','Velvety hot chocolate, with pistachio sauce, topped with whipped cream.'],
   ['Magic Stars','4.50','Velvety hot chocolate, topped with whipped cream and magic stars.'],
   ['Maltesers','4.50','Velvety hot chocolate, topped with whipped cream and crushed maltesers.'],
   ['Rolo','5.00','Velvety hot chocolate, with caramel syrup, topped with whipped cream and rolos.'],
   ['Oreo','4.50','Velvety hot chocolate, topped with whipped cream and oreos.']]}
 ]},
 {label:'Shakes & drinks',sections:[
  {title:'Milkshakes',items:[
   ['Kinder','5.00','Creamy milkshake blended with kinder bueno bars and white chocolate and hazelnut sauce. Topped with whipped cream.'],
   ['Biscoff','5.00','Creamy milkshake blended with biscoff biscuits and biscoff sauce. Topped with whipped cream.'],
   ['Magic Stars','5.00','Creamy milkshake blended with magic stars and milk chocolate sauce. Topped with whipped cream.'],
   ['Maltesers','5.00','Creamy milkshake blended with maltesers and milk chocolate sauce. Topped with whipped cream.'],
   ['Rolo','5.00','Creamy milkshake blended with rolos, milk chocolate sauce and caramel syrup. Topped with whipped cream.'],
   ['Oreo','5.00','Creamy milkshake blended with oreos. Topped with whipped cream.'],
   ['Pistachio','5.00','Creamy milkshake blended with pistachio sauce. Topped with whipped cream.'],
   ['Kanafa','5.50','Creamy milkshake blended with pistachio sauce and kanafa. Topped with whipped cream.'],
   ['Ferrero Rocher','5.50','Creamy milkshake blended with ferrero rochers and milk chocolate sauce. Topped with whipped cream.']]},
  {title:'Soft Drinks',note:'£1.50',items:['Coke Zero','Coke Zero Cherry','Fanta Orange','Fanta Lemon','Rubicon Passionfruit','Rubicon Mango','Bottled Water'].map(name=>[name,'',''])},
  {title:'Red Bull',note:'£1.75',items:['Original Red Bull','Cherry Sakura','Vanilla Berry','White Peach','Forest Fruits','Tropical Fruits'].map(name=>[name,'',''])}
 ]},
 {label:'Brownies & waffles',sections:[{title:'Brownie Trays',items:trays('brownie')},{title:'Waffles/Crepes',items:trays('waffle')}]}
];
