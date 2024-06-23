document.addEventListener("DOMContentLoaded", () =>{
    let divs = document.getElementsByTagName("div")
    let title = document.querySelector("p")
    let columns = []
    let circles = []
    let current_turn = "red"
    let playing = true

    function start (){
        for(i = 0; i < divs.length; i++){
            if (inside("column", divs[i].classList)) new Column(divs[i])
            if (inside("circle", divs[i].classList)) circles.push(divs[i])
        }
    }

    class Column{
        constructor(visual){
            this.empty = 6
            this.visual = visual

            this.visual.addEventListener("click", () => {
                if (this.empty > 0 && playing){
                    this.empty --
                    if (this.visual.children[this.empty]) this.visual.children[this.empty].classList.add(current_turn)
                    current_turn = (current_turn == "red") ? "yellow" : "red"
                    title.innerHTML = current_turn.toUpperCase() + "'s TURN"
                    if (check_victory(circles, columns)) {
                        title.innerHTML = check_victory(circles, columns).toUpperCase() + " WON"
                        playing = false
                    }
                    let test = 0
                    columns.forEach(column => {
                        if (column.empty == 0) test ++
                    });
                    if (test == 7) {
                        title.innerHTML = "DRAW"
                        playing = false
                    }
                }
            })

            columns.push(this)
        }
    }

    start()
})

function inside(elt, list){
    for (j=0; j<list.length; j++){
        if (list[j] == elt){
            return true
        }
    }
    return false
}

function check_victory (circles, columns){
    result = null
    circles.forEach(div => {
        if (div.classList[2]){
            // Vertical
            let rank = parseInt(div.classList[0]) - 1
            let test = 0
            for (i = 1; i < 4; i ++){
                if (div.parentNode.children[rank - i] && div.parentNode.children[rank - i].classList[2]){
                    if (div.classList[2] == div.parentNode.children[rank - i].classList[2]) test++
                }
                if (test > 2) return result = div.classList[2]
            }

            // Horizontal
            test = 0
            let index = parseInt(div.parentNode.classList[0]) - 1
            for (i = 1; i < 4; i ++){
                if (columns[index + i] && columns[index + i].visual.children[rank].classList[2]){
                    if (div.classList[2] == columns[index + i].visual.children[rank].classList[2]) test++
                }
                if (test > 2) return result = div.classList[2]
            }

            // Oblique
            oblique(div, columns, 1, 1, index, rank)
            oblique(div, columns, -1, 1, index, rank)
            oblique(div, columns, 1, -1, index, rank)
            oblique(div, columns, -1, -1, index, rank)
        }
    });
    return result
}

function oblique (div, columns, step_h, step_v, index, rank){
    test = 0
    for (i = 1; i < 4; i ++){
        if (columns[index + (step_h * i)] && columns[index + (step_h * i)].visual.children[rank + (step_v * i)] && columns[index + (step_h * i)].visual.children[rank + (step_v * i)].classList[2]){
            if (div.classList[2] == columns[index + (step_h * i)].visual.children[rank + (step_v * i)].classList[2]) test++
        }
        if (test > 2) return result = div.classList[2]
    }
}