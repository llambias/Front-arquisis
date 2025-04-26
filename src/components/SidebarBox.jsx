import './SidebarBox.css';


function SidebarBox() {
    return(
        <>
    <div className="card">
        <form align ="center" >
            <title>Aplicar filtros de busqueda</title>
            <a>Se puede filtrar por simbolo, cantidad, precio y fecha</a>
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
    
    <div className="card">
        <form align ="center" >
        <title>Cambia la cantidad de valores de busqueda</title>
        <a>Cambia el tamaño de la tabla</a>
        <div className = "field">
            <input  id="tamano" 
            placeholder="tamaño" className="input-field" name="tamano" type="number" step="1" max="50"></input>
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