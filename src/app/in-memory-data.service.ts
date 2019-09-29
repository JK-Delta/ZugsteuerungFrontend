import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Train } from "./train";
import { Injectable } from '@angular/core';
import { Port } from './port';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    let portsMap1: {[key: number]: Port} = {
      [0]: {url: "90:84:2B:04:5F:A0", id: 0, deviceType: 2, power: 50}};
    let portsMap2: {[key: number]: Port} = {
      [0]: {url: "90:84:2B:04:5F:A0", id: 0, deviceType: 2, power: 0},
      [1]: {url: "90:84:2B:04:5F:A1", id: 1, deviceType: 2, power: 100}};
    let portsMap3: {[key: number]: Port} = {};
    let portsMap4: {[key: number]: Port} = {
      [0]: {url: "12:34:56:78:9A:B0", id: 0, deviceType: 2, power: 0},
      [1]: {url: "12:34:56:78:9A:B0", id: 1, deviceType: 2, power: -100},
      [2]: {url: "12:34:56:78:9A:B0", id: 2, deviceType: 4, power: 50}};
    let portsMap5: {[key: number]: Port} = {
        [0]: {url: "90:84:2B:04:5F:A0", id: 0, deviceType: 2, power: 0}};
    let portsMap6: {[key: number]: Port} = {
          [0]: {url: "90:84:2B:04:5F:A0", id: 0, deviceType: 2, power: 100}};  
    let portsMap7: {[key: number]: Port} = {
      [0]: {url: "90:84:2B:04:5F:A0", id: 0, deviceType: 2, power: -40}};
    const trainList = [
      { name: "Personenzug", battery: 100, distance: 0.8, color: {r: 0, g: 160, b: 220}, online: true, url: "AF:25:77:11:00:C7", 
      ports: portsMap1}, 
      { name: "Güterzug Grün", battery: 50, distance: 0.6, color: {r: 0, g: 200, b: 0}, online: true, url: "12:34:56:78:9A:B0", 
      ports: portsMap5}, 
      { name: "Güterzug Gelb", battery: 11, distance: 0.8, color: {r: 240, g: 220, b: 0}, online: true, url: "AB:17:CE:98:FF:AA", 
      ports: portsMap6}, 
      { name: "Güterzug Rot", battery: 99, distance: 0.45, color: {r: 180, g: 20, b: 0}, online: true, url: "A0:C1:DB:BB:10:DF", 
      ports: portsMap7}, 
      { name: "Güterzug X", battery: 99, distance: 0.1, color: {r: 120, g: 0, b: 160}, online: false, url: "A2:C1:DB:BB:10:DF", 
      ports: portsMap3}, 
      { name: "Güterzug 2", battery: 99, distance: 0.5, color: {r: 180, g: 180, b: 180}, online: true, url: "A3:C1:DB:BB:10:DF", 
      ports: portsMap4}, 
      { name: "Lok1", battery: 0, distance: 0.24, color: {r: 0, g: 100, b: 180}, online: true, url: "90:84:2B:04:5F:A0", 
      ports: portsMap2}, 
    ];
    return {trainList};
  }

}
