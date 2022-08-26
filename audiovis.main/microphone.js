class Microphone {
    constructor() {
        this.initialized = false
        navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
            //connect with web audio api
            this.audioContext = new AudioContext()
            //now i need to convert the raw stream data return by getusermedia into audio node,.........createMediasource take raw media stream ,in this case audio coming from microphone and converts into audio nodes ,....we create audio node because that's the format web audio api can work with.
            this.microphone = this.audioContext.createMediaStreamSource(stream)
            //audio nodes can be analysed ,using createanalyser , this creates analyser which can be used to expose audio time and frequency data to create visualisations
            this.analyser = this.audioContext.createAnalyser()
            //fft-fast fourier transform,this algo will help us to slice the audio into equal no of samples(must be power of 2 between 2**5 and 2**15 ,default is 2048).....these audio samples created also referred to as bins
            this.analyser.fftSize = 512
            //i need to know how many bins are available,..frequencybincount is a read only property and always equal to fftsize/2 ,so now my visualizers will have 256 bars

    
            this.bufferlength = this.analyser.frequencyBinCount
            //to make this audio data easier to manage i need to convert this bufferlength into 8-bit array ,i do this to convert my audio data into an array of unsigned 8-bit intergers ,these integers can only be whole numbers between 0 and 255 so this new data array will contain 256 audio samples coming from microphone and each of these audio samples will be represented by no between 0 - 255
            this.dataArray = new Uint8Array(this.bufferlength)
            //connect allows us to direct data from one audio node to another
            this.microphone.connect(this.analyser)
            this.initialized = true
        }.bind(this)).catch(function (error) { console.log(error) })
    }
    //returns an array of audio samples for visualizers
    getSamples() {
        // getByteTimeDomainData copies the current waveform or time domain data into an Uint array we passed to it
        //it will overwrite whatever is in that array at that moment with new audio information...
        this.analyser.getByteTimeDomainData(this.dataArray)
        // console.log(this.dataArray)

        //i want to normalize that value and spread them b/w the range of minus 1 to plus 1 which will serve us better in our visualisation
        let normSamples = [...this.dataArray].map(e => e / 128 - 1)
        // console.log(normSamples)
        return normSamples

    }
    //will return single average value of current audio volume coming from microphone
    getVolume() {
        this.analyser.getByteTimeDomainData(this.dataArray)
        let normSamples = [...this.dataArray].map(e => e / 128 - 1)
        
        let sum = 0
        //we will use rms value for average cause we have normsamples element from -1 to 1
        for (let i = 0; i < normSamples.length; i++) {
            sum += normSamples[i] * normSamples[i]
        }
        let volume = Math.sqrt(sum / normSamples.length)
        return volume
    }
}
// const microphone = new Micrphone()
// console.log(microphone)
