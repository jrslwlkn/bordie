package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	r "gopkg.in/rethinkdb/rethinkdb-go.v6"
)

var session *r.Session

const PAGE_LEN = 20

func main() {
	var err error

	err = godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file.")
	}

	router := gin.Default()
	router.Use(CORSMiddleware()) // FIXME: this middleware is only for dev env

	session, err = r.Connect(r.ConnectOpts{
		Address:  os.Getenv("RETHINKDB_HOST") + ":" + os.Getenv("RETHINKDB_PORT"),
		Database: os.Getenv("RETHINKDB_NAME"),
		Username: os.Getenv("RETHINKDB_USERNAME"),
		Password: os.Getenv("RETHINKDB_PASSWORD"),
	})
	if err != nil {
		log.Fatalln(err.Error())
	}
	defer session.Close()

	router.GET("/boards", getBoards)
	router.GET("/board/:boardId/:page", getBoard)
	router.GET("/thread/:threadId", getThread)
	router.GET("/thread/:threadId/post/:postId", getPost)
	router.POST("/board/:boardId", postOp)
	router.POST("/thread/:threadId", postReply)

	router.Run("localhost:8088")
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func getBoards(c *gin.Context) {
	res, err := r.Table("boards").Run(session)
	if err != nil {
		fmt.Println(err.Error())
	}
	var data []interface{}
	err = res.All(&data)
	if err != nil {
		fmt.Println(err.Error())
	}
	c.IndentedJSON(http.StatusOK, data)
}

func getBoard(c *gin.Context) {
	board := c.Params.ByName("boardId")
	// page := c.Params.ByName("page") // TODO

	res, err := r.Table("threads").Filter(r.Row.Field("id").Eq(board)).Run(session)
	if err != nil {
		fmt.Println(err.Error())
	}
	var data interface{}
	err = res.One(&data)
	if err != nil {
		fmt.Println(err.Error())
	}
	c.IndentedJSON(http.StatusOK, data)
}

func getThread(c *gin.Context) { // TODO

}

func getPost(c *gin.Context) { // TODO

}

type opPayload struct {
	Title string `json:"title"`
	Text  string `json:"text"`
	// Images []string `json:"images"`
}

func postOp(c *gin.Context) {
	data, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		fmt.Println(err)
	}
	var payload opPayload
	json.Unmarshal(data, &payload)

	// FIXME: add validation

	res, err2 := r.Table("threads").Insert(payload).Run(session)
	if err2 != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("response: ...")
	fmt.Println(res)
}

func postReply(c *gin.Context) { // TODO

}
