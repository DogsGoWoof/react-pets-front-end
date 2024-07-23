const PetList = (props) => {

    const pets = props.petList.map((pet) => (
        <a key={pet._id} onClick={() => props.updateSelected(pet)}>
            <li>{pet.name}</li>
        </a>
    ));

    return (
        <div className="sidebar-container">
            <h1>Pet List</h1>
            <div className="list-container">
                {!props.petList.length ? (
                    <h2>No Pets Yet!</h2>
                ) : (
                    <ul role="list">{pets}</ul>
                )}
            </div>
            <div className='paw-pad pet-list'>
                <div className='toes'><div className='toe one'></div><div className='toe two'></div><div className='toe three'></div><div className='toe four'></div></div>
                <button onClick={props.handleFormView}>
                    {props.isFormOpen ? 'Close Form' : 'New Pet'}
                </button>
            </div>
        </div>
    );

};

export default PetList;
