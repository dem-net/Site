import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'

export default {
    // eslint-disable-next-line
    install (Vue) {
        const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:5001/elevation-hub')
        .configureLogging(LogLevel.Information)
        .build()
        
        //connection.start()

        let startedPromise = null
        function start () {
        startedPromise = connection.start().catch(err => {
            // eslint-disable-next-line
            console.error('Failed to connect with hub', err)
            return new Promise((resolve, reject) => 
            setTimeout(() => start().then(resolve).catch(reject), 5000))
        })
        return startedPromise
        }
        connection.onclose(() => start())
        
        start()

        // use new Vue instance as an event bus
        const elevationHub = new Vue() 
        // every component will use this.$elevationHub to access the event bus
        Vue.prototype.$elevationHub = elevationHub
        // Forward server side SignalR events through $elevationHub, where components will listen to them
        connection.on('ReportProgress', (message, percent) => {
            elevationHub.$emit('server-progress', { message, percent })
        })


    }
}


