import './SidebarBox.css';


function SidebarBox() {
    return(
        <>
    <div className="card">
                <form align ="center" >
                <div className = "field">
                    <input  id="simbolo" 
                    placeholder="simbolo" className="input-field" name="symbol" ></input>
                    </div><div className = "field">
                    <input  id="cantidad" 
                    placeholder="cantidad" className="input-field" name="fecha" type="number"></input>
                    </div><div className = "field">
                    <input  id="precio" 
                    placeholder="Precio" className="input-field" name="precio"></input>
                    </div><div className = "field">
                    <input  id="fecha" 
                    placeholder="fecha" className="input-field" name="fecha" type="date"></input>
                    </div>
                <button className = "button"  type="submit">
                    Aplicar busqueda
                </button>
                </form>
            </div> 
    </>
    );

}

export default SidebarBox