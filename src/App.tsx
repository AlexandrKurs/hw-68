const App = () => {

    return (
        <div className="container">
            <h1 className="text-center bg-black text-white text-uppercase py-2">To do list</h1>
            <form className="my-3 mx-auto w-50 d-flex justify-content-between align-items-center">
                <div className="w-75">
                    <input type="text" className="form-control border-black bg-secondary text-white"/>
                </div>
                <button className="btn btn-dark">Add</button>
            </form>
            <hr/>
        </div>
    )

};
export default App; 