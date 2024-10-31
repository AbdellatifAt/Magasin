import React from 'react'
import DataTable from "react-data-table-component"


const TableData = ({dataTab , columns , title ,addActions , search  , setSearch , transactions ,demande , AjouteDemandeLivre , paginationParPag = 10  }) => {
  return (
    <>
    <DataTable  
  
      title={title}
      columns={columns}
      data={dataTab} 
      pagination
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      paginationPerPage={paginationParPag}
      paginationRowsPerPageOptions={[ 7,10, 25, 50, 100]} 
      actions={ transactions &&  <div className='flex'> <button onClick={addActions} type="button" className="text-teal-700 hover:text-white border border-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-teal-500 dark:text-teal-500 dark:hover:text-white dark:hover:bg-teal-500 dark:focus:ring-teal-800">Ajouter</button> {demande && <button onClick={AjouteDemandeLivre} className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800' > Demande</button>} </div>}
      subHeader
      subHeaderComponent={ <input type="text" id="search" className="outline-none max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Search Her" value={search} onChange={(e) => setSearch(e.target.value)}        />}
      //
      subHeaderAlign='center'
    />

  </>
  )
}

export default TableData


