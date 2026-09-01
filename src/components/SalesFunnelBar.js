import { FunnelChart } from 'react-funnel-pipeline'
import 'react-funnel-pipeline/dist/index.css'
import { opportunityStages } from '../constants/opportunityOptions.js'

function SalesFunnelBar() {

    return (
        <div className="sales-funnel-bar ml-4 mt-4 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Sales Funnel:</h2>
            <FunnelChart 
                data={opportunityStages.map(stage => ({ name: stage.value, value: 1 }))}
            />
        </div>
        
    )
}

export default SalesFunnelBar;