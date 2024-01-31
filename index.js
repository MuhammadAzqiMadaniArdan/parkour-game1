// import image from './assets/platform/platform.png'
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// pengaturan music
var music = document.getElementById("music")
var musicImage = document.getElementById("music_image")

function playAudio() {
  music.play();
}

function pauseAudio() {
  music.pause();
}

//ukuran canvas
canvas.width =innerWidth
canvas.height =innerHeight

// mengatur jatuhnya player (gravitasi)
const gravity = 1.5
console.log(c)

const platform = './assets/img/desktop/platform1.png'
const platformsmall = './assets/img/desktop/platform1small.png'
const cactus = './assets/img/desktop/cactus2.png'
const background = './assets/img/desktop/desert-bg.jpg'
const spriteStandRight = './assets/img/desktop/spriteStandRight.png'
const spriteStandLeft = './assets/img/desktop/spriteStandLeft.png'
const spriteRunRight = './assets/img/desktop/spriteRunRight.png'
const spriteRunLeft = './assets/img/desktop/spriteRunLeft.png'
// const spriteStandRight = './assets/img/desktop/zafinaSprite.png'
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
        // pengatur kecepatan
        this.speed = 10
        // posisi awal
        this.position ={
            x: 100,
            y:100
        }
        // tingkat kecepa  tan 
        this.velocity = {
            x:0, 
            y:1
        }
        this.width = 70
        this.height = 180 

        this.image = createImage(spriteStandRight)
        this.frames = 0
        this.sprites = {
            // penempatan untuk animasi berdiri
            stand:{
                // fungsi right ditekan
                right: createImage(spriteStandRight),
                // fungsi left ditekan
                left: createImage(spriteStandLeft),
                cropWidth : 177,
                width: 66
            },
            // penempatan untuk animasi berlari
            run: {
                right: createImage(spriteRunRight),
                left: createImage(spriteRunLeft),
                cropWidth: 341,
                // width dari jumlah objek dibagi width foto
                width: 127.875
            }
        }

        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth = 177
        
    } 
    draw(){
        // chara style
        c.drawImage(
            this.currentSprite,
            // this.image,
            // thisimage digunakan untuk menampikan image sebeum berada di frmat current
            // 400 berasal dari width gambar dibagi jumlah objek
            // 400 * this.frames,
            // 177 * this.frames,
            this.currentCropWidth * this.frames,
            // 0,
            0,
            // 400 berasal dari ukuran angsung width gambar png,jpg atau svg dibagi jumlah objek yang ditampikan
            // 400,
            // 177,
            this.currentCropWidth,
            400,
            this.position.x,
            this.position.y,
            this.width,
            this.height
            )

    }

    update(){ 
        // chara gravity setting
        // jika function draw dipanggil dibawah postion gravitasi tidak akan bergerak
        this.frames++
        // chara setting animatin 
        // 15.5 berasal dari berapa banyak subjek yang ada di bagi 2 ditambah 2
        // if (this.frames > 15.5) this.frames = 0
        // if (this.frames > 28 && this.currentSprite === this.sprites.stand.right)
        if (this.frames > 59 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left))
         this.frames = 0

        // 29 = frames yang idbutuhkan 
        else if(this.frames > 29 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)
        )
        this.frames = 0

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
class Platformsmall {
    constructor({x,y,image}){
        this.position ={
            x,
            y
        }
        
        image.width = 571
        image.height = 217
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

let platformImage = createImage(platform)

// console.log(image.width)
// console.log(canvas.width)
// console.log(image)
// mengambil class player dengan menginisialisasi menggunakan variabel let 'player' sama dengan platform juga
let player = new Player()
let platforms = [
]
let genericObjects = [
]
let lastKey

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0

// _______________________INIT___________
// init function disini digunakan untuk merestart ke tempat mulai atau kembali ke tempat lobby (pemanggilan bisa untuk restart button atau kalah)
function init () {

platformImage = createImage(platform)
platformSmallImage = createImage(platformsmall)

// console.log(image.width)
// console.log(canvas.width)
// console.log(image)
// mengambil class player dengan menginisialisasi menggunakan variabel 'player' sama dengan platform juga
player = new Player()
platforms = [
new Platformsmall({
        x:1136 * 4 + 300 -2 + 1136 - 571, y:270,
        image:createImage(platformsmall)
    }),
new Platform({
    x:-1, y:470,
    image:platformImage
}),
 new Platform({
    x:1136, y:470,image:platformImage
}),
new Platform({
    x:1136 * 2 + 100, y:470,image:platformImage
}),
new Platform({
    x:1136 * 3 + 300, y:470,image:platformImage
}),
new Platform({
    x:1136 * 4 + 300 -2, y:470,image:platformImage
}),
// new Platformsmall({
//         x:1136 * 4 + 300 -2 + 1136 - 571, y:370,
//         image:createImage(platformsmall)
//     }),
 new Platform({
    x:1136 * 5 + 700 , y:470,image:platformImage
})
]
genericObjects = [
    new GenericObject({
        x:-1,
        y:-350,
        image:createImage(background),
        width:5200,
        height:2400
    }),
    new GenericObject({
        x:1900,
        y:-370,
        image:createImage(background),
        width:5200,
        height:2400
    }),
    new GenericObject({
        x:1900 * 2,
        y:-370,
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
    }),
    new GenericObject({
        x:1700,
        y:300,
        image:createImage(cactus),
        width:1000,
        height:1000
    })
]

scrollOffset = 0
}
// ________________________INITEND_________
// animation process
function animate (){
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    // jika tidak menggunakan perintah dibawah (c.clearRecrt) maka animsai akan berjalan terus
    c.fillRect(0,0, canvas.width,canvas.height)
    genericObjects.forEach((genericObject) => {
        genericObject.draw()
    })
    // movement player
    platforms.forEach((platform) => {
        platform.draw()
    })
    player.update()

    // rumus movement controller jalan dan berhenti serta rumus canvas/window atau layar bergerak sesuai chara (object)
    // kondisi jika controller kanan ditekan maka akan berjalan dengan kecepatan player yang berada pada variabel diatas
    if(keys.right.pressed && player.position.x < 400){
        player.velocity.x = player.speed
    }
    else if((keys.left.pressed && player.position.x > 100) || keys.left.pressed && scrollOffset === 0 && player.position.x > 0){
    player.velocity.x = -player.speed
    } 
    else {
        player.velocity.x = 0

        // window kondisi dijalankan ketika object berhenti
        if(keys.right.pressed){
            scrollOffset += player.speed
            platforms.forEach((platform) => {
                platform.position.x -= player.speed
            })
            // parallax effect
            genericObjects.forEach((genericObject) => {
                genericObject.position.x -= player.speed * 0.66
            })
        } else if(keys.left.pressed && scrollOffset > 0){
            scrollOffset -= player.speed
            platforms.forEach((platform) => {
                platform.position.x += player.speed
            })
            genericObjects.forEach((genericObject) => {
                genericObject.position.x += player.speed * 0.66
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
    // ANIMASI-- STAND CONDITION (JIKA BERHENTI)
    // sprite switching
    if (keys.right.pressed &&
        lastKey === 'right' && player.currentSprite !== player.sprites.run.right ){
        // player frames digunakan untuk mengulang frame kembali menjadi awal
        player.frames = 1
        player.currentSprite = player.sprites.run.right
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    } 
    else if(
        keys.left.pressed &&
        lastKey === 'left' && player.currentSprite !== player.sprites.run.left
    ){
        player.currentSprite = player.sprites.run.left
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    }
    else if(
        !keys.left.pressed &&
        lastKey === 'left' && player.currentSprite !== player.sprites.stand.left
    ){
        player.currentSprite = player.sprites.stand.left
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    }
    else if(
        !keys.right.pressed &&
        lastKey === 'right' && player.currentSprite !== player.sprites.stand.right
    ){
        player.currentSprite = player.sprites.stand.right
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    }
    // win condition
    if(scrollOffset > 1136 * 5 + 300){
        console.log('You Win!')
    }
    // lose condinition
    if(player.position.y > canvas.height){
        // console.log('You lose')
        // ____________________INIT-untuk-restart_____
        init()
    }

}
// memanggil init
init()
// memanggil animasi
animate()

// controller
addEventListener('keydown', ({ keyCode }) => {
    // untuk melihat code dari setiap keyboard menggunakan 
    console.log(keyCode)
    // switch kasus untuk menekan code apa yang ditekan dan bagaimana bergerak
    switch (keyCode) {
        // kiri
        case 65:
            console.log('left')
            keys.left.pressed = true
            // pastikan memiliki sprite kearah kiri
                // current key digunakan untuk memodifikasi hasil dari user yang telah menekan tombol untuk ke arah kiri
            lastKey = 'left'
                // percobaan untuk melihat jalannya suatu animasi dari karakter (yang di tab saja)
                // player.currentSprite = player.sprites.run.left
                // player.currentCropWidth =   player.sprites.run.cropWidth
            // player.width = player.sprites.stand.width
                // percobaan untuk melihat jalannya suatu animasi dari karakter (yang di tab saja)
                // player.width = player.sprites.run.width
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
             // jika ditekan makan animasi berlari dijalankan
            lastKey = 'right'
            // player.velocity.x += 1
            break; 
            // atas
        case 87:
            console.log('up')
            player.velocity.y -= 25
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
            // player.velocity.y += 20
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