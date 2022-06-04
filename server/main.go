package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/boards", getBoards)
	router.GET("/board/:boardId/:page", getBoard)
	router.GET("/thread/:threadId", getThread)
	router.GET("/thread/:threadId/post/:postId", getPost)
	router.POST("/post", postPost)

	router.Run("localhost:8080")
}

func getBoards(c *gin.Context) {
	file, err := ioutil.ReadFile("boards.json")
	if err != nil {
		fmt.Println(err)
	}
	var data []interface{}
	err = json.Unmarshal([]byte(file), &data)
	if err != nil {
		fmt.Println(err)
	}
	c.IndentedJSON(http.StatusOK, data)
}

func getBoard(c *gin.Context) {
}

func getThread(c *gin.Context) {

}

func getPost(c *gin.Context) {

}

func postPost(c *gin.Context) {
}
