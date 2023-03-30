
const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats=document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();


container.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

select.addEventListener('change',function(e){
calculateTotal();
} );


function calculateTotal(){
    const selectedSeats=container.querySelectorAll('.seat.selected');

    const selectedSeatsArr=[];
    const seatsArr=[];

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat)
    });

    seats.forEach(function(seat){
        seatsArr.push(seat);
    });

    let selectedSeatIndexes=selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat)
    });


    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    let price = select.value;
    amount.innerText = (selectedSeatCount * select.value) + " TL";
    saveToLocalStorage(selectedSeatIndexes);
}

function saveToLocalStorage(indexes){
localStorage.setItem('selectedSeats',JSON.stringify(indexes));
localStorage.setItem('selectedMovieIndex',select.selectedIndex)
}

function getFromLocalStorage(){
const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));

if (selectedSeats!=null&&selectedSeats.length) {
select.selectedIndex=selectedMovieIndex;
}


const selectedMovieIndex=JSON.parse(localStorage.getItem('selectedMovieIndex'));
if(selectedMovieIndex!=null){
select.selectedIndex=selectedMovieIndex;
}
}
