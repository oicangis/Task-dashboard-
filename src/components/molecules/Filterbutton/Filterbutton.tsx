import Button from "@/components/atoms/button/buttons"

type filterButtonProps = {
    filter: (string)
    setfilter: (estado: string) =>void
}

export default function filterButton ({filter,setfilter}:filterButtonProps){
    return(
        
  <div className="mb-4 flex gap-2">
    <Button onClick={() => setfilter('all')} className={`rounded-full px-4 py-1 text-sm font-medium transition-colors ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Todas</Button>
    <Button onClick={() => setfilter('pending')} className={`rounded-full px-4 py-1 text-sm font-medium transition-colors ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Pendientes</Button>
    <Button onClick={() => setfilter('completed')} className={`rounded-full px-4 py-1 text-sm font-medium transition-colors ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Completadas</Button>
    </div>
    )
}