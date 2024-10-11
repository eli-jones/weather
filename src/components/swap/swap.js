function Swap({ unit, switchUnit }) {        
    
    return (
        <button onClick={switchUnit} className='units'>{unit}</button>
    );
    
};

export default Swap;