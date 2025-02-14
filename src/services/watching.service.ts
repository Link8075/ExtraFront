import Watches from '../models/watching.model'
import { Watching } from '../types/Watching.type';
import boom from '@hapi/boom';

class WatchingService {
    async create(watching: Watching) {
        const newWatching = await Watches.create({...watching}).catch((error) => {
            console.log('Could not save watches', error)
        })
        return newWatching
    }
    
    async findAll() {
        const watches = await Watches.find().catch((error) => {
            console.log('Error while connecting to the DB', error)
        })
        
        if (!watches) {
            throw boom.notFound('There are not watches')
        }
        
        return watches;
    }
    
    async findById(id: string) {
        const watching = await Watches.findById(id).catch((error) => {
            console.log('Error while connecting to the BD', error)
        })
        
        if (!watching) {
            throw boom.notFound('Watching not found')
        }
        
        return watching;
    }
    
    async deleteById(id: string) {
        const watching = await Watches.findByIdAndDelete(id).catch((error) => {
            console.log('Error while connecting to the BD', error)
        })
        if (!watching) {
            throw boom.notFound('Watching not found')
        }
        return watching;
    }
    
    async editById(id: string, watching: Watching) {
        const newWatching = await Watches.findByIdAndUpdate(id, { $set: watching }, { new: true }).catch((error) => {
            console.log('Error while connecting to the BD', error)
        })
        if (!newWatching) {
            throw boom.notFound('Watching not found')
        }
        return newWatching
    }
    
    async findByUser(user: string) {
        try {
            const watches = await Watches.find({ user: user })
            return watches
        } catch (error) {
            console.error('Error al buscar por user:', error)
            throw error;
        }
    }
}

export default WatchingService;