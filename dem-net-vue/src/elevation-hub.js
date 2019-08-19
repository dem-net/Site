import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'

export default {
    // eslint-disable-next-line
    install (Vue) {
        const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:5001/elevation-hub')
        .configureLogging(LogLevel.Information)
        .build()
        
        connection.start()
    }
}


