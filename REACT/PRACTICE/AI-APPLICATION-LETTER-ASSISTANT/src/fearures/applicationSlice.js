const { createSlice } = require("@reduxjs/toolkit");


const initialState = {
      seletedCategory : null,
        selectedDocumentType:null,
        formData:{},
        language:"English",
        tone:"Professional",
}

const applicationSlice = createSlice ({
    name:"application",
    initialStatee,
    reducers:{
        
    }

})

export default applicationSlice.reducer;