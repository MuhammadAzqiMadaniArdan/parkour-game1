
// const spriteStandRight = './assets/img/desktop/spriteStandRight.png'
const sprite2 = './assets/img/desktop/player22.png'
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
// Player2 modeling
class Player2 {
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
        this.width = 66
        this.height = 150 

        this.image = createImage(sprite2)
        this.frames = 0
    }
    draw(){
        // chara style
        c.drawImage(
            this.image,
            // 340 * this.frames,
            0,
            0,
            340,
            384,
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
        if (this.frames > 12) this.frames = 0
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




// img.src ='assets/platform/platform1.png'


// console.log(image.width)
// console.log(canvas.width)
// console.log(image)
// mengambil class player2 dengan menginisialisasi menggunakan variabel let 'player2' sama dengan platform juga
let player2 = new Player2()

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

// _______________________INIT___________
// init function disini digunakan untuk merestart ke tempat mulai atau kembali ke tempat lobby (pemanggilan bisa untuk restart button atau kalah)
function init () {

// console.log(image.width)
// console.log(canvas.width)
// console.log(image)
// mengambil class player2 dengan menginisialisasi menggunakan variabel 'player2' sama dengan platform juga
player2 = new Player2()


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
    // movement player2
    platforms.forEach((platform) => {
        platform.draw()
    })
    player2.update()

    // rumus movement controller jalan dan berhenti serta rumus canvas/window atau layar bergerak sesuai chara (object)
    // kondisi jika controller kanan ditekan maka akan berjalan dengan kecepatan player2 yang berada pada variabel diatas
    if(keys.right.pressed && player2.position.x < 400){
        player2.velocity.x = player2.speed
    }
    else if((keys.left.pressed && player2.position.x > 100) || keys.left.pressed && scrollOffset === 0 && player2.position.x > 0){
    player2.velocity.x = -player2.speed
    } 
    else {
        player2.velocity.x = 0

        // window kondisi dijalankan ketika object berhenti
        if(keys.right.pressed){
            scrollOffset += player2.speed
            platforms.forEach((platform) => {
                platform.position.x -= player2.speed
            })
            // parallax effect
            genericObjects.forEach((genericObject) => {
                genericObject.position.x -= player2.speed * 0.66
            })
        } else if(keys.left.pressed && scrollOffset > 0){
            scrollOffset -= player2.speed
            platforms.forEach((platform) => {
                platform.position.x += player2.speed
            })
            genericObjects.forEach((genericObject) => {
                genericObject.position.x += player2.speed * 0.66
            })
        }
    }

    // console.log(scrollOffset)

    //rumus kondisi platform yang bersifat tetap dan bisa diinjak 
    // platform collision detection
    platforms.forEach((platform) => {
    if(
        player2.position.y + player2.height <= platform.position.y 
        && player2.position.y + player2.height + player2.velocity.y >= platform.position.y 
        && player2.position.x + player2.width >= platform.position.x 
        && player2.position.x <= platform.position.x + platform.width
        ){
            player2.velocity.y = 0
        }
    })
    // win condition
    if(scrollOffset > 1136 * 5 + 300){
        console.log('You Win!')
    }
    // lose condinition
    if(player2.position.y > canvas.height){
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
            // player2.velocity.x -= 1
            break; 
            // bawah
        case 83:
            console.log('down')
            // player2.velocity.y += 20
            break; 
            // kanan
        case 68:
            console.log('right')
            keys.right.pressed = true
            // player2.velocity.x += 1
            break; 
        case 39:
            console.log('right')
            keys.right.pressed = true
            // player2.velocity.x += 1
            break; 
            // atas
        case 87:
            console.log('up')
            player2.velocity.y -= 25
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
            // player2.velocity.x -= 1
            break; 
            // bawah
        case 83:
            console.log('down')
            // player2.velocity.y += 20
            break; 
            // kanan
        case 68:
            console.log('right')
            keys.right.pressed = false
            // player2.velocity.x = 0
            break; 
            // atas
        case 87:
            console.log('up')
            break; 
    }
    // memastikan keys right ditekan (d)
    // console.log(keys.right.pressed)

})