function moveToL(start, to, duration, speed){ //Функция движения
    /*
        start - координаты нчальной позиции
        to - координаты окончания маршрута
        duration - время старта и окончния движения
        speed - ускорение объекта
    */
    let [x, y] = start;
    let [toX, toY] = to;
    let atf = speed;
    let [tstart, tend] = duration;
    let tf = Math.sqrt(Math.pow((toX - x), 2) + Math.pow((toY - y), 2));
    let s = 0,
        ts = tf,
        rez = [],
        dt = tend - tstart; //delta time
    let a = (toX - x) / tf,
        b = (toY - y) / tf;

    function getTs(x, y){
        return Math.sqrt(Math.pow((toX - x), 2) + Math.pow((toY - y), 2));
    } 

    function move(dt){
        s += atf * dt;
        x += (s * a);
        y += (s * b);
        ts = getTs(x, y)

        if (s > 0){
            rez.push([x, y]);
            move(dt)
        }
    }

    move(dt);
    
    rez.push(to);
    return rez;
}

// console.table(moveToL([10, 15], [125, 150], [1, 1.1], 10));

function moveTo(start, to, duration, speed){ //Функция движения с ускорением
    /*
        start - координаты нчальной позиции
        to - координаты окончания маршрута
        duration - время старта и окончния движения
        speed - ускорение объекта
    */
    let [x, y] = start;
    let [toX, toY] = to;
    let atf = speed;
    let [tstart, tend] = duration;
    let tf = Math.sqrt(Math.pow((toX - x), 2) + Math.pow((toY - y), 2));
    let f = atf,
        s = 0,
        ts = tf,
        rez = [],
        dt = tend - tstart; //delta time
    let a = (toX - x) / tf,
        b = (toY - y) / tf;

    function getTs(x, y){
        return Math.sqrt(Math.pow((toX - x), 2) + Math.pow((toY - y), 2));
    }    

    function move(dt){
        if (ts > (tf / 2)){
            atf += f * dt;
            s += atf * dt;
            let aa = (s * a)
            x += (s * a);
            y += (s * b);
            ts = getTs(x, y)
        }else{
            atf -= f * dt;
            s -= atf * dt;
            x += (s * a);
            y += (s * b);
            ts = getTs(x, y)
        }

        if (s > 0){
            rez.push([x, y]);
            move(dt)
        }else{
            console.log(ts)
        }
    }

    move(dt);
    
    rez.push(to);
    return rez;
}

// console.table(moveTo([10, 15], [125, 150], [1, 1.1], 10));

function turnTo(pos, to, duration, speed){ //Поворот на месте 
    /**
     * pos - текущая ориентция объекта, задается в градусах
     * to - в какую сторону вращать объект, задается в градусах
     * duration - время старта и окончния движения
     * speed - скорость вращения, град/ед.времени
     */
    let [tstart, tend] = duration;
    let rez = [],
        dt = tend - tstart; //delta time

    function turn(dt){
        pos += speed * dt;
        if (pos < to){
            rez.push(pos);
            turn(dt)
        }
    }

    turn(dt);

    rez.push(to)
    return rez;
}

// console.table(turnTo(0, 176, [1, 1.1], 15))

function moveToTurn(pos, to, point, r, duration, speed){ //поворот по дуге (Не смог осилить)
    /**
     * pos - текущая ориентция объекта, задается в градусах
     * to - в какую сторону вращать объект, задается в градусах
     * point - точка поворота (в какую сторону поворот)
     * r - радиус поворота
     * duration - время старта и окончния движения
     * speed - скорость вращения, град/ед.времени
     */

    let rez = [],
        s = 0;
    let [tstart, tend] = duration
    let [x, y] = pos;
    let [eX, eY] = to;
    let [cx, cy] = point;
    let c = Math.abs(Math.sqrt(Math.pow((eX - x), 2) + Math.pow((eY - y), 2)));
    let inC = Math.acos(tCos(r, r, c)) * (180 / Math.PI);
    let lD = (Math.PI * r * inC) / 180;
    let dt = tend - tstart; //delta time
    let lX = lD;

    function tCos(af, bf, cf){
        let r = (af ** 2 + bf ** 2 - cf ** 2) / (2 * af * bf)
        return r
    }

    function pL(p){
        let t = Math.asin(p / r)
        return t;
    }

    function getLD(x, y){
        let c = Math.abs(Math.sqrt(Math.pow((eX - x), 2) + Math.pow((eY - y), 2)));
        let inC = Math.acos(tCos(r, r, c)) * (180 / Math.PI);
        let lD = (Math.PI * r * inC) / 180;
        return lD;
    }

    function move(dt){
        s += speed * dt;
        x += s * Math.sin(pL(s));
        y += s * Math.sin(pL(s));
        lX = getLD(x, y);
        console.log(getLD(x, y))

        if (lX > speed){
            rez.push([x, y]);
            move(dt)
        }
    }

    move(dt);

    rez.push(to)
    return rez;
}

// console.table(moveToTurn([10, 15], [150, 130], [40, 55], 95, [1, 1.1], 10))

class IndexMap{
    constructor(){
        this.col = []
    }

    set (key, value){
        this.col.push(new Map([[key, value]]))
        return this;
    }

    hash(key){
        return this.col.some(elem => {
            for (let i of elem.keys()){
                return i === key
            }
        });
    }

    hashIndex(index){
        return this.size() > index && index >= 0;
    }

    get(key){
        try{
            return this.col.find(elem => {
                for (let i of elem.keys()){
                    return i === key
                }
            }).get(key);
        }catch(e){
            return undefined;
        }
        
    }

    getBuIndex(index){
        try{
            for (let key of this.col[index].keys()){
                return this.col[index].get(key);
            }
        }catch(e){
            return undefined;
        }
    }

    remove(key){
        this.col = this.col.filter(item => {
            for (let i of item.keys()){
                return i !== key
            }
        })
        return this;
    }

    size(){
        return this.col.length
    }

    forEach(fn){ //(value, key, index)
        for( let i = 0; i < this.col.length; i++){
            let k;
            for (let key of this.col[i].keys()){
                k = key
            }
            let v = this.col[i].get(k);
            fn(v, k, i)
        }
        return this;
    }

    union(...maps){
        maps.forEach(item => {
            this.set(item[0], item[1])
        })
    }
}

let mapa = new IndexMap();
mapa.set('gg', 23);
mapa.set('dd', 24);
mapa.set('ss', 20);
mapa.set('ff', 2);
mapa.set('aa', 28);

console.log(mapa.hash('gg'));
console.log(mapa.hashIndex(5));
console.log(mapa.size());
console.log(mapa.get('gg'));
console.log(mapa.getBuIndex(0));
console.log(mapa);
mapa.remove('gg');
console.log(mapa);
console.log(mapa.get('gg'));
console.log(mapa.getBuIndex(4));
mapa.union(['fa', 23], ['gh', 54]);

mapa.forEach((v, k, i) => {
    console.log(v);
    console.log(k);
    console.log(i);
})





