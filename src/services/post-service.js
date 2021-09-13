import http from "../http-common";

export function getAll() {
    return http.get("/");
  }

export function get(id) {
    return http.get(`/${id}`);
  }

export function create(data) {
    return http.post("/", data);
  }

export function update(id, data) {
    return http.put(`/${id}`, data);
  }

export function deletePost(id) {
    return http.delete(`/${id}`);
  }

export function deleteAll() {
    return http.delete(`/`);
  }

export function findByTitle(title) {
    return http.get(`/?title=${title}`);
  }