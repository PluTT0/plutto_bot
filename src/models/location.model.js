import mongoose from "mongoose";
const Shema = mongoose.Schema;

const LocationShema = new Shema({
    name: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    adress: {
        type: String,
        require: true,
    },
    uuid: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    }

});

export default mongoose.model('location', LocationShema);