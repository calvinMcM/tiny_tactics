import Phaser from "phaser";
import { buildField } from "./utilities/buildField";
import { isoTransform } from "./utilities/isoTransform";

class Example extends Phaser.Scene {
    preload() {
        this.load.spritesheet("tiles", "src/img/Basic_Tiles.png", { frameWidth: 50, frameHeight: 50 });
        this.load.spritesheet("person", "src/img/Basic_Person.png", { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        this.cameras.main.zoom = 1.5;

        var terrain = this.add.group();

        var sprites = this.add.group();
        const spriteFrames = this.anims.generateFrameNumbers("person", {});
        this.anims.create({
            key: "leftWalk",
            yoyo: true,
            frames: spriteFrames.slice(8, 12),
            frameRate: 6,
            repeat: -1,
        });
        this.anims.create({
            key: "rightWalk",
            yoyo: true,
            frames: spriteFrames.slice(0, 4),
            frameRate: 6,
            repeat: -1,
        });
        this.anims.create({
            key: "upWalk",
            yoyo: true,
            frames: spriteFrames.slice(4, 8),
            frameRate: 6,
            repeat: -1,
        });
        this.anims.create({
            key: "downWalk",
            yoyo: true,
            frames: spriteFrames.slice(12, 16),
            frameRate: 6,
            repeat: -1,
        });

        const spriteLocale = [
            { x: 0, y: 0 },
            { x: 0, y: 15 },
        ];
        for (let q = 0; q < 3; q++) {
            spriteLocale.push(new Phaser.Geom.Point(Math.floor(Math.random() * 16), Math.floor(Math.random() * 16)));
        }

        const field = buildField(16, 16, 5);
        for (let y = 0; y < field.length; y++) {
            for (let x = 0; x < field[y].length; x++) {
                let z = field[y][x];
                const s = this._createTile(x, y, z);
                s.forEach(sprite => terrain.add(sprite));

                const chPos = spriteLocale.find((sl) => sl.x === x && sl.y == y);
                if (chPos) {
                    const ch = this._createUnit(x, y, z);
                    ch.forEach(s => sprites.add(s));
                }
            }
        }

        terrain.incX(24 * 25);
        terrain.incY(14 * 14);
        sprites.incX(24 * 25);
        sprites.incY(14 * 14);
    }

    _createTile(x: number, y: number, z: number): Phaser.GameObjects.Sprite[] {
        let tileSprite = 1;
        if (z == 3) {
            tileSprite = 0;
            z = 2;
        } else if (z > 3) {
            tileSprite = 2;
            z = 2;
        }

        const { x: _x, y: _y } = isoTransform(x, -y, z);
        const u = this.add.sprite(_x, _y + 20, "tiles", tileSprite == 2 ? 2 : 3);
        const s = this.add.sprite(_x, _y, "tiles", tileSprite);
        return [s, u];
    }

    _createUnit(x: number, y: number, z: number) {
        if (z > 2) {
            z = 3;
        }
        const { x: _x, y: _y } = isoTransform(x, -y, z);
        const ch = this.add.sprite(_x, _y - 25, "person", 1);
        ch.setDataEnabled();
        ch.data.set("x", x);
        ch.data.set("y", y);
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                ch.play("leftWalk");
                break;
            case 1:
                ch.play("upWalk");
                break;
            case 2:
                ch.play("rightWalk");
                break;
            case 3:
                ch.play("downWalk");
                break;
        }

        return [ch];
    }
}

let MAX_WIDTH = window.innerWidth * 0.9;
let MAX_HEIGHT = window.innerHeight * 0.9;

const config = {
    type: Phaser.AUTO,
    parent: "root",
    width: MAX_WIDTH,
    height: MAX_HEIGHT,
    scene: [Example],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
};

const game = new Phaser.Game(config);

window.onresize = () => {};

document.onload = () => {
    console.log("Bob");
};
