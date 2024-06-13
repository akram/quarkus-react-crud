package com.digitalcode;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/persons")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PersonResource {

    @GET
    public List<Person> getAll() {
        return Person.listAll();
    }

    @POST
    @Transactional
    public void add(Person person) {
        person.persist();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Person update(@PathParam("id") Long id, Person person) {
        Person entity = Person.findById(id);
        if(entity == null) {
            throw new WebApplicationException("Person with id " + id + " does not exist.", 404);
        }
        entity.name = person.name;
        entity.email = person.email;
        return entity;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        Person entity = Person.findById(id);
        if(entity == null) {
            throw new WebApplicationException("Person with id " + id + " does not exist.", 404);
        }
        entity.delete();
    }
}
