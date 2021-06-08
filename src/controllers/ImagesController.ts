import { Request, Response } from 'express';
import axios from 'axios';
import AppError from '../errors/AppError';
import CreateCsvController from './CreateCsvController';

interface NASAImage {
    extended: {
        mastAz: string,
        mastEl: string;
        sclk: string;
        scaleFactor: string;
        xyz: string;
        subframeRect: string;
        dimension: string;
    };
    sol: number;
    attitude: string;
    image_files: {
        medium: string;
        small: string;
        full_res: string;
        large: string;
    },
    imageid: string;
    camera: {
        filter_name: string;
        camera_vector: string;
        camera_model_component_list: string;
        camera_position: string;
        instrument: string;
        camera_model_type: string;
    },
    caption: string;
    sample_type: string;
    date_taken_mars: string;
    credit: string;
    date_taken_utc: string;
    json_link: string;
    link: string;
    drive: string;
    title: string;
    site: number;
    date_received: string;
}

interface CsvRow {
    mastAz: string,
    mastEl: string;
    sclk: string;
    scaleFactor: string;
    xyz: string;
    subframeRect: string;
    dimension: string;
    sol: number;
    attitude: string;
    medium: string;
    small: string;
    full_res: string;
    large: string;
    imageid: string;
    filter_name: string;
    camera_vector: string;
    camera_model_component_list: string;
    camera_position: string;
    instrument: string;
    camera_model_type: string;
    caption: string;
    sample_type: string;
    date_taken_mars: string;
    credit: string;
    date_taken_utc: string;
    json_link: string;
    link: string;
    drive: string;
    title: string;
    site: number;
    date_received: string;
}

export default class ImagesController {
    private imagesContainer = [];

    public async index(request: Request, response: Response): Promise<any> {
        let allData: NASAImage[] = [];

        let page = 0;
        const dataLink = `https://mars.nasa.gov/rss/api/?feed=raw_images&category=mars2020&feedtype=json&num=100&page=${page}&order=sol+desc&extended=sample_type::full`

        const getData = async (url: string): Promise<NASAImage[]> => {
            const response = await axios.get(url);

            if (!response) {
                throw new AppError('Fetch data from mars.nasa.gov failed.');
            }

            const { images } = response.data;

            return images;
        }

        // 32 pages
        const data = await getData(dataLink);
        // https://c2fo.github.io/fast-csv/docs/formatting/examples#appending-to-a-csv
        // while (page < 2) {
        //     const data = await getData(dataLink);
        //     allData = [...allData, ...data];
        //     page += 1;
        // }

        // return response.json(allData);
        return response.json({ message: 'ok' });
    }
}