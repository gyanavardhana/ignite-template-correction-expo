import AsyncStorage from "@react-native-async-storage/async-storage";
import { load, loadString, save, saveString, clear, remove } from "./storage";

const VALUE_OBJECT = { x: 1 };
const VALUE_STRING = JSON.stringify(VALUE_OBJECT);

describe("AsyncStorage", () => {
  beforeEach(async () => {
    await AsyncStorage.clear(); // Clear storage before each test
    await AsyncStorage.setItem("string", "string");
    await AsyncStorage.setItem("object", VALUE_STRING);
  });

  it("should be defined", () => {
    expect(AsyncStorage).toBeDefined();
  });

  it("should have default keys", async () => {
    const keys = await AsyncStorage.getAllKeys();
    expect(keys).toEqual(["string", "object"]);
  });

  it("should load data", async () => {
    expect(await load<object>("object")).toEqual(VALUE_OBJECT);
    expect(await loadString("object")).toEqual(VALUE_STRING);

    expect(await load<string>("string")).toEqual("string");
    expect(await loadString("string")).toEqual("string");
  });

  it("should save strings", async () => {
    await saveString("string", "new string");
    expect(await loadString("string")).toEqual("new string");
  });

  it("should save objects", async () => {
    await save("object", { y: 2 });
    expect(await load<object>("object")).toEqual({ y: 2 });

    await save("object", { z: 3, also: true });
    expect(await load<object>("object")).toEqual({ z: 3, also: true });
  });

  it("should save strings and objects", async () => {
    await saveString("object", "new string");
    expect(await loadString("object")).toEqual("new string");
  });

  it("should remove data", async () => {
    await remove("object");
    expect(await load<object>("object")).toBeNull();

    const keysAfterRemove = await AsyncStorage.getAllKeys();
    expect(keysAfterRemove).toEqual(["string"]);

    await remove("string");
    expect(await load<string>("string")).toBeNull();

    const keysAfterSecondRemove = await AsyncStorage.getAllKeys();
    expect(keysAfterSecondRemove).toEqual([]);
  });

  it("should clear all data", async () => {
    const keysBeforeClear = await AsyncStorage.getAllKeys();
    expect(keysBeforeClear).toEqual(["string", "object"]);

    await clear();
    const keysAfterClear = await AsyncStorage.getAllKeys();
    expect(keysAfterClear).toEqual([]);
  });
});