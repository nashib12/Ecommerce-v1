import React from 'react'

const Pagination = ({ currentPage, lastPage, onPageChange }) => {
    if (lastPage <= 1) return null;
    const pages = Array.from({ length: lastPage}, (_, i) => i + 1);
    const window = 2;
    const visible = pages.filter(
        (p) => p === 1 || p === lastPage || Math.abs(p - currentPage) <= window
    );
  return (
    <div className='flex items-center gap-2 mt-6'>
        <button onClick={() => onPageChange(currentPage - 1)} disabled= { currentPage === 1 }
            className='px-3 py-1.5 rounded border text-sm disabled:opacity-40 hover:bg-gray-100'>Prev</button>
        {visible.reduce((acc, page, i, arr) => {
            if(i > 0 && page - arr[i - 1] > 1) {
                acc.push(<span key={`elipsis-${page}`} className='px-2 text-gray-400'>...</span>)
            }
            acc.push(<button key={`apgination-${page}`} onClick={() => onPageChange(page)} className={`px-3 py-1.5 rounded border text-sm ${ page === currentPage ? "bg-blue-600 text-white border-blue-600"
                : "hover:bg-gray-100" }`}>
                    {page}
            </button>)
            return acc;
        }, [])}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === lastPage} className='px-3 py-1.5 rounded border text-sm disabled:opacity-40 hover:bg-gray-100'>
            Next
        </button>
    </div>
  )
}

export default Pagination