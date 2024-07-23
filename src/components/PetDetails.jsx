const PetDetails = (props) => {

    if (!props.selected)
        return (
            <div className="details-container">
                <h1 id="no-details">NO DETAILS</h1>
            </div>
        );

    return (
        <div className="details-container">
            <h1>{props.selected.name}</h1>
            <div className="foodbowl">
                <div className="triangle left"></div>
                <h2>Breed: {props.selected.breed}</h2>
                <div className="triangle right"></div>
            </div>
            <div className="foodbowl">
                <div className="triangle left"></div>
                <h2>
                    Age: {props.selected.age} year{props.selected.age > 1 ? 's' : ''} old
                </h2>
                <div className="triangle right"></div>
            </div>
            <div className="button-container">

                <div className='paw-pad pet-details'>
                    <div className='toes'><div className='toe one'></div><div className='toe two'></div><div className='toe three'></div><div className='toe four'></div></div>
                    <button onClick={() => props.handleFormView(props.selected)}>Edit</button>
                </div>

                <div className='paw-pad pet-details'>
                    <div className='toes'><div className='toe one'></div><div className='toe two'></div><div className='toe three'></div><div className='toe four'></div></div>
                    <button onClick={() => props.handleRemovePet(props.selected._id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PetDetails;
