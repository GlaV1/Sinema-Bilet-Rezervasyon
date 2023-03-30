//tüm koltuklar ve ekranı al
const container = document.querySelector('.container');
//seçili koltukları gösteren metni al
const count = document.getElementById('count');
//toplam fiyatı gösteren metni al
const amount = document.getElementById('amount');
//seçilen film elementini al
const select = document.getElementById('movie');
//rezerve edilmeyen tğm koltukları al
const seats=document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();

//koltuk veya ekrana tıklanınca yapılacaklar
container.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

//film listesinden farklı bir film seçildiğinde yapılacaklar
select.addEventListener('change',function(e){
calculateTotal();
} );

//toplam fiyat hesaplama fonksiyonu
function calculateTotal(){
    //seçilen tüm koltukları al
    const selectedSeats=container.querySelectorAll('.seat.selected');
    //seçilen koltukların numaralandırmak için boş dizi oluştur
    const selectedSeatsArr=[];
    const seatsArr=[];
    //seçilen koltuk listesini içinde döngü başlatarak her bir elemanı diziye ekle
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

}


const selectedMovieIndex=JSON.parse(localStorage.getItem('selectedMovieIndex'));
if(selectedMovieIndex!=null){
select.selectedIndex=selectedMovieIndex;
}
}
