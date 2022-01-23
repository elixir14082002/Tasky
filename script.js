const taskContainer= document.querySelector(".task-container");
console.log(taskContainer);

const globalStore=[]; //empty array

const newCard = (taskDetails) =>
{
    return (`<div class="col-6 col-md-4">
    <div class="card">
        <div class="card-header d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
            <button type="button" class="btn btn-outline-danger" id="${taskDetails.id}" onclick="delCard(id)"><i class="fas fa-trash"></i></button>
        </div>
        <div class="card-body">
            <img src="${taskDetails.image}" class="card-img-top" alt="image">
            <h5 class="card-title text-primary fw-bold mt-2">${taskDetails.title}</h5>
            <h6 class="card-title text-primary fw-bold mt-2">${taskDetails.type}</h6>
            <p class="card-text">${taskDetails.desc}</p>
        </div>
    </div>
</div>`);
};

const displayCardDetails = () =>
{
    const details= localStorage.getItem("tasky");

    const {cards} = JSON.parse(details);

    cards.map((cardObject) => {
        taskContainer.insertAdjacentHTML("beforeend", newCard(cardObject));
      
        globalStore.push(cardObject);
    });

};

const saveChanges = () =>{
    const taskDetails={
        id: Date.now(),
        image: document.getElementById("ImageURL").value ,
        title: document.getElementById("TaskTitle").value ,
        type: document.getElementById("TaskType").value ,
        desc: document.getElementById("TaskDescription").value ,
    };
    console.log(taskDetails);

    taskContainer.insertAdjacentHTML("beforeend", newCard(taskDetails));

    globalStore.push(taskDetails);
    localStorage.setItem("tasky", JSON.stringify( {cards: globalStore} ));

};

const delCard = (e) =>
{
    globalStore.forEach((values, index)=>{
        if(values.id==e)
        {
            globalStore.splice(index, 1);
        }
    });
    localStorage.setItem("tasky", JSON.stringify( {cards: globalStore} ));
    window.location.reload();
}