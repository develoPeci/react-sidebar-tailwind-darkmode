// src/redux/slices/userData.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    uidUser: null,
    nombres: '',
    apellidos: '',
    correo: '',
    timezone: '',
    VisionStatement:'',
    PurposeStatement:'',
    CoreValues:'',
    CouncilMembers:'',
    orden:'',
    reload: false
,};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            const { uidUser, nombres, apellidos, correo, identificador, fotoDeperfil, timezone,orden } = action.payload;
            state.uidUser = uidUser;
            state.nombres = nombres;
            state.apellidos = apellidos;
            state.correo = correo;
            state.fotoDeperfil = fotoDeperfil;
            state.timezone = timezone;
            state.orden = orden;
            state.reload = false;
        },
        clearUserData: (state) => {
            state.uidUser = null;
            state.nombre = '';
            state.apellido = '';
            state.correo = '';
            state.identificador = '';
            state.fotoDeperfil = '';
            state.timezone = '';
            state.orden = "";
        },
        setContentGoals: (state, action)=>{
            const { VisionStatement,PurposeStatement,CoreValues,CouncilMembers,Goals } = action.payload;
            state.VisionStatement = VisionStatement;
            state.PurposeStatement = PurposeStatement;
            state.CoreValues = CoreValues;
            state.CouncilMembers = CouncilMembers;
            state.Goals = Goals;
        }
    },
});

export const { setUserData, clearUserData,setContentGoals } = userSlice.actions;

export default userSlice.reducer;
