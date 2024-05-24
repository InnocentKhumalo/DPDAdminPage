// Function to fetch data from Google Sheets
async function fetchData(sheetId, range) {
    const apiKey = 'AIzaSyBavBDjvBbsgdvzKok9DoDU0VORsq-sazw';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    return data.values;
}

// Function to display data in a table
function displayData(tableId, data) {
    const table = document.getElementById(tableId);
    table.innerHTML = '';
    
    if (!data || data.length === 0) {
        table.innerHTML = '<tr><td>No data available</td></tr>';
        return;
    }
    
    // Create table headers
    const headers = data[0];
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    
    // Create table rows
    data.slice(1).forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        
        table.appendChild(tr);
    });
}


// IDs and ranges for Google Sheets
const sheets = {
    serviceRequest: { id: '17wf92hybCwWEcYNo8hhOpVT0f2ah3sCLK3QA_PU-b0I', range: 'Request Service!A1:H' },
    quotationRequest: { id: '1NGwtyGcs12ngshxVx2zqIj2AKTlytFVQWy4DHog41c0', range: 'RequestForm!A1:F' },
    messageReceived: { id: '14cCjROpgg4cQErai6MsXWWaWUoFZFILoH8Ds0xVVcPA', range: 'Message Form!A1:E' }
};

// Fetch and display data for each sheet
async function loadSheetsData() {
    const serviceRequestData = await fetchData(sheets.serviceRequest.id, sheets.serviceRequest.range);
    displayData('service-request-table', serviceRequestData);
    
    const quotationRequestData = await fetchData(sheets.quotationRequest.id, sheets.quotationRequest.range);
    displayData('quotation-request-table', quotationRequestData);
    
    const messageReceivedData = await fetchData(sheets.messageReceived.id, sheets.messageReceived.range);
    displayData('message-received-table', messageReceivedData);
}

// Load data on page load
window.onload = loadSheetsData;
