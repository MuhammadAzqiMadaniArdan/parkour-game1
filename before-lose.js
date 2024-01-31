// import image from './assets/platform/platform.png'
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//ukuran canvas
canvas.width =innerWidth
canvas.height =innerHeight

// mengatur jatuhnya player (gravitasi)
const gravity = 1.5
console.log(c)

const platform = './assets/img/desktop/platform1.png'
const cactus = './assets/img/desktop/cactus2.png'
const background = './assets/img/desktop/desert-bg.jpg'
// // plarform image
// const importImage = (imageUrl) => {
// 	const image = new Image();
// 	image.src = imageUrl;
// 	imageUrl = 'assets/platform/platform1.png';

// 	return image;
// }

// const ground =new importImage('assets/platform/platform1.png',canvas.width,canvas.height)
// importImage('assets/platform/platform1.png')
// console.log(importImage)

// ground.create()
// Player modeling
class Player {
    // dijalankan lebih awal ??
    constructor(){
        // posisi awal
        this.position ={
            x: 100,
            y:100
        }
        // kecepax  tan 
        this.velocity = {
            x:0, 
            y:1
        }
        this.width = 30
        this.height = 30
    }
    draw(){
        // chara style
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y, this.width,this.height)
    }

    update(){ 
        // chara gravity setting
        // jika function draw dipanggil dibawah postion gravitasi tidak akan bergerak
        this.draw()
        this.position.y +=  this.velocity.y
        this.position.x +=  this.velocity.x

        // mengatur kondisi gravity
        if(this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity
    // untuk area bawah 
    // INGAT
    // GUNAKAN INI KETIKA KAMU JATUH PADA GAME INGIN DI JATHKAN SAMPAI KE BAWA HATAU HANYA MENGURANGI NYAWA YANG  ADA
    // else this.velocity.y = 0
    }
}

// Platform timeeeeee uhuy!
class Platform {
    constructor({x,y,image}){
        this.position ={
            x,
            y
        }
        
        image.width = 1139;
        image.height = 200
        this.image = image
        this.width = image.width
        this.height =image.height
    }
    
    draw(){
        // c.fillStyle = 'blue'
        // c.fillRect(this.position.x,this.position.y, this.width,this.height)
        c.drawImage(this.image,this.position.x,this.position.y)
    }
}
class GenericObject {
    constructor({x,y,image,width,height}){
        this.position ={
            x,
            y
        }
        
        // image.width = 2200
        // image.height = 2400
        this.image = image
        this.width = width
        this.height =height
    }
    
    draw(){
        // c.fillStyle = 'blue'
        // c.fillRect(this.position.x,this.position.y, this.width,this.height)
        c.drawImage(this.image,this.position.x,this.position.y)
    }
}
class bg {
    constructor({x,y,image}){
        this.position ={
            x,
            y
        }
        
        image.width = 2200
        image.height = 2400
        this.image = image
        this.width = image.width
        this.height =image.height
    }
    
    draw(){
        // c.fillStyle = 'blue'
        // c.fillRect(this.position.x,this.position.y, this.width,this.height)
        c.drawImage(this.image,this.position.x,this.position.y)
    }
}

let img = document.createElement('image');
img.id = 'imgId';
function createImage(imageSrc){
    const image = new Image()
    image.src = imageSrc
    return image
}

// img.src ='assets/platform/platform1.png'
const platformImage = createImage(platform)

// console.log(image.width)
// console.log(canvas.width)
// console.log(image)
// mengambil class player dengan menginisialisasi menggunakan variabel const 'player' sama dengan platform juga
const player = new Player()
const platforms = [new Platform({
    x:-1, y:470,
    image:platformImage
}),
 new Platform({
    x:1136, y:470,image:platformImage
}),
 new Platform({
    x:1136 * 2 + 100, y:470,image:platformImage
}),
]
const genericObjects = [
    new GenericObject({
        x:-1,
        y:-350,
        image:createImage(background),
        width:5200,
        height:2400
    }),
    new GenericObject({
        x:-1,
        y:200,
        image:createImage(cactus),
        width:1000,
        height:1000
    })
]
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0

// animation process
function animate (){
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    // jika tidak menggunakan perintah dibawah (c.clearRecrt) maka animsai akan berjalan terus
    c.fillRect(0,0, canvas.width,canvas.height)
    // movement player
    genericObjects.forEach((genericObject) => {
        genericObject.draw()
    })
    platforms.forEach((platform) => {
        platform.draw()
    })
    player.update()

    // rumus movement controller jalan dan berhenti serta rumus canvas/window atau layar bergerak sesuai chara (object)
    // kondisi jika controller kanan ditekan maka akan berjalan dengan kecepatan 5
    if(keys.right.pressed && player.position.x < 400){
        player.velocity.x = 5
    }
    else if(keys.left.pressed && player.position.x > 100){
    player.velocity.x = -5
    } 
    else {
        player.velocity.x = 0

        // window kondisi dijalankan ketika object berhenti
        if(keys.right.pressed){
            scrollOffset += 5
            platforms.forEach((platform) => {
                platform.position.x -= 5
            })
            // parallax effect
            genericObjects.forEach((genericObject) => {
                genericObject.position.x -= 3
            })
        } else if(keys.left.pressed){
            scrollOffset -= 5
            platforms.forEach((platform) => {
                platform.position.x += 5
            })
            genericObjects.forEach((genericObject) => {
                genericObject.position.x += 3
            })
        }
    }

    // console.log(scrollOffset)

    //rumus kondisi platform yang bersifat tetap dan bisa diinjak 
    // platform collision detection
    platforms.forEach((platform) => {
    if(
        player.position.y + player.height <= platform.position.y 
        && player.position.y + player.height + player.velocity.y >= platform.position.y 
        && player.position.x + player.width >= platform.position.x 
        && player.position.x <= platform.position.x + platform.width
        ){
            player.velocity.y = 0
        }
    })
    // win condition
    if(scrollOffset > 2000){
        console.log('You Win!')
    }
    // lose condinition
    if(player.position.y > canvas.height){
        console.log('You lose')
    }

}

// memanggil fungsi init
init()
// memanggil animasi
animate()

// controller
addEventListener('keydown', ({ keyCode }) => {
    // untuk melihat code dari setiap keyboard menggunakan 'console.log(keyCode)'
    // switch kasus untuk menekan code apa yang ditekan dan bagaimana bergerak
    switch (keyCode) {
        // kiri
        case 65:
            console.log('left')
            keys.left.pressed = true
            // player.velocity.x -= 1
            break; 
            // bawah
        case 83:
            console.log('down')
            // player.velocity.y += 20
            break; 
            // kanan
        case 68:
            console.log('right')
            keys.right.pressed = true
            // player.velocity.x += 1
            break; 
            // atas
        case 87:
            console.log('up')
            player.velocity.y -= 30
            break; 
    }
     // memastikan keys right ditekan (d)
    // console.log(keys.right.pressed)
})
addEventListener('keyup', ({ keyCode }) => {
    // untuk melihat code dari setiap keyboard menggunakan 'console.log(keyCode)'
    // switch kasus untuk menekan code apa yang ditekan dan bagaimana bergerak
    switch (keyCode) {
        // kiri
        case 65:
            console.log('left')
            keys.left.pressed = false
            // player.velocity.x -= 1
            break; 
            // bawah
        case 83:
            console.log('down')
            player.velocity.y += 20
            break; 
            // kanan
        case 68:
            console.log('right')
            keys.right.pressed = false
            // player.velocity.x = 0
            break; 
            // atas
        case 87:
            console.log('up')
            break; 
    }
    // memastikan keys right ditekan (d)
    // console.log(keys.right.pressed)

})