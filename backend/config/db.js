import mongoose from "mongoose";
import {url} from '../config/config.js';
import chalk from 'chalk';
const connectDb = async () => {
  try {
    await mongoose.connect(url);
    console.log(`${chalk.green.bold('Connection database successfully...')}`);
  } catch (error) {
    console.log(`${chalk.red.bold(`Error Connection database...`)}, ${error}`);
  }
};
export default connectDb;
