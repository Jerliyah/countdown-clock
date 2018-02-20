/* ====== DOM Grab ====== */
var countdown_text = document.querySelector('#countdown-text')
var buttons = Array.from( document.querySelectorAll('nav > button:not(.custom)') );
var custom = document.querySelector('input')


/* ====== Variables ====== */
var countdown;


/* ====== Functions ====== */
function display(seconds) {
    let minutes = Math.floor( seconds / 60 );
    let leftover_seconds = ( seconds - (minutes * 60) ).toString()

    if( leftover_seconds.length < 2 ) {
        leftover_seconds = "0" + leftover_seconds
    }

    if(seconds > 0 ) {
        countdown_text.innerText = `Back in \n${minutes}:${leftover_seconds}`
    }
    else {
        countdown_text.innerText = 'Available'
    }

}


function set_timer(e) {
    e.stopPropagation();
    let minutes = e.target.dataset.minutes || e.target.value
    timer(minutes * 60)
}


function timer(seconds) {
    // Clear any previous timer
    if( countdown ) { clearInterval(countdown) }

    
    const start = Date.now() + (seconds * 1000);
    
    display(seconds)
    
    countdown = setInterval( () => {

                        let seconds_left = Math.round( (start - Date.now()) / 1000 )
                        
                        if( seconds_left <= 0 ) { clearInterval(countdown) }
                        
                        display(seconds_left)
                        
                    }, 1000)
}

function toggle_active(e) {
    let element = e.target
    
    // Have only one active element
    siblings = Array.from( element.parentNode.children )
    siblings.forEach( sibling => sibling.classList.remove('active') );

    element.classList.toggle('active'); 
}





/* ====== Events ====== */
buttons.forEach( button => { 
    button.addEventListener('click', set_timer) 
    button.addEventListener('click', toggle_active)
})
custom.addEventListener('submit', set_timer)
